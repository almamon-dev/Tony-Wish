<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\JobTitle;
use App\Models\RecCompanyPolicy;
use App\Models\RecEmergencyDrill;
use App\Models\RecItpPlan;
use App\Models\RecMaintenanceLog;
use App\Models\RecMonitoring;
use App\Models\RecOccupHealthSurv;
use App\Models\RecPersonnelStructure;
use App\Models\RecSafetyChecklist;
use App\Models\RecToolboxTalk;
use App\Models\RecTrainingColumn;
use App\Models\RecTrainingRow;
use App\Models\RecTrainingValue;
use App\Models\RecWelder;
use App\Models\RecWelderQualification;
use App\Models\RecWeldProcedure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RECFormController extends Controller
{
    private function getOwnerId()
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;

        // Fallback for admin testing
        if (! $ownerId && ($user->user_type === 'admin' || $user->user_type === 'administrator')) {
            $ownerId = $user->id;
        }

        return $ownerId;
    }

    public function rec01()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC01');
        }

        $documents = \App\Models\RecControlledDocumentRegister::where('business_owner_id', $ownerId)->get();

        return Inertia::render('Administrator/RECForms/REC01', [
            'initialDocuments' => $documents,
        ]);
    }

    public function rec01Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->documents as $doc) {
            $revisionDate = ! empty($doc['revisionDate']) && strtotime($doc['revisionDate']) ? $doc['revisionDate'] : null;
            $nextReviewDate = ! empty($doc['nextReviewDate']) && strtotime($doc['nextReviewDate']) ? $doc['nextReviewDate'] : null;

            \App\Models\RecControlledDocumentRegister::updateOrCreate(
                ['id' => is_numeric($doc['id']) ? $doc['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'document_number' => $doc['documentNumber'] ?? '',
                    'document_title' => $doc['documentTitle'] ?? '',
                    'current_revision' => $doc['currentRevision'] ?? '',
                    'revision_date' => $revisionDate,
                    'location' => $doc['location'] ?? '',
                    'process_owner' => $doc['processOwner'] ?? '',
                    'next_review_date' => $nextReviewDate,
                    'document_link' => $doc['documentLink'] ?? '',
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            \App\Models\RecControlledDocumentRegister::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Controlled Document Register saved successfully!');
    }

    public function rec02()
    {
        $ownerId = $this->getOwnerId();

        $jobTitles = [];
        $existingRoles = [];

        if ($ownerId) {
            $jobTitles = JobTitle::where('business_owner_id', $ownerId)->pluck('title')->toArray();
            $existingRoles = RecPersonnelStructure::where('business_owner_id', $ownerId)
                ->get()
                ->map(fn ($role) => [
                    'id' => $role->id,
                    'title' => $role->job_title,
                    'responsibilities' => $role->responsibilities,
                    'qty' => $role->quantity,
                ]);
        }

        return Inertia::render('Administrator/RECForms/REC02', [
            'jobTitles' => array_values(array_unique($jobTitles)),
            'initialRoles' => $existingRoles,
        ]);
    }

    public function rec02Store(Request $request)
    {
        $ownerId = $this->getOwnerId();

        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        RecPersonnelStructure::where('business_owner_id', $ownerId)->delete();

        foreach ($request->roles as $role) {
            if (empty($role['title'])) {
                continue;
            }

            RecPersonnelStructure::create([
                'job_title' => $role['title'],
                'responsibilities' => $role['responsibilities'] ?? '',
                'quantity' => $role['qty'] ?? 1,
                'business_owner_id' => $ownerId,
            ]);

            JobTitle::firstOrCreate([
                'title' => $role['title'],
                'business_owner_id' => $ownerId,
            ]);
        }

        return back()->with('success', 'Personnel structure saved successfully!');
    }

    public function rec03()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC03', ['initialColumns' => [], 'initialEmployees' => []]);
        }

        $columns = RecTrainingColumn::where('business_owner_id', $ownerId)->get();
        if ($columns->isEmpty()) {
            // Seed defaults for new owner
            $defaults = [
                'Fork Truck', 'Grinding Wheels', 'Manual Handling',
                'IOSH Training', 'First Aid', 'Working at Heights',
                'Confined Spaces', 'Platforms',
            ];
            foreach ($defaults as $title) {
                RecTrainingColumn::create([
                    'title' => $title,
                    'business_owner_id' => $ownerId,
                ]);
            }
            $columns = RecTrainingColumn::where('business_owner_id', $ownerId)->get();
        }

        $rows = RecTrainingRow::where('business_owner_id', $ownerId)
            ->with(['values'])
            ->get()
            ->map(function ($row) {
                $training = [];
                foreach ($row->values as $v) {
                    $training[$v->column_id] = $v->value;
                }

                return [
                    'id' => $row->id,
                    'name' => $row->name,
                    'position' => $row->position,
                    'competence' => $row->competence,
                    'training' => $training,
                ];
            });

        $jobTitles = JobTitle::where('business_owner_id', $ownerId)->pluck('title')->toArray();

        return Inertia::render('Administrator/RECForms/REC03', [
            'initialColumns' => $columns->map(fn ($c) => ['id' => $c->id, 'title' => $c->title]),
            'initialEmployees' => $rows,
            'jobTitles' => $jobTitles,
        ]);
    }

    public function rec03Store(Request $request)
    {
        $ownerId = $this->getOwnerId();

        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->employees as $empData) {
            $row = RecTrainingRow::updateOrCreate(
                ['id' => is_numeric($empData['id']) ? $empData['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'name' => $empData['name'],
                    'position' => $empData['position'],
                    'competence' => $empData['competence'],
                ]
            );

            RecTrainingValue::where('row_id', $row->id)->delete();
            if (isset($empData['training'])) {
                foreach ($empData['training'] as $colId => $val) {
                    RecTrainingValue::create([
                        'row_id' => $row->id,
                        'column_id' => (int) $colId,
                        'value' => $val,
                    ]);
                }
            }
        }

        if (! empty($request->deletedRowIds)) {
            RecTrainingRow::whereIn('id', $request->deletedRowIds)->delete();
        }

        return back()->with('success', 'Training data saved successfully!');
    }

    public function rec04()
    {
        $ownerId = $this->getOwnerId();

        $meetings = RecToolboxTalk::where('business_owner_id', $ownerId)
            ->orderBy('meeting_date', 'desc')
            ->get();

        return Inertia::render('Administrator/RECForms/REC04', [
            'initialMeetings' => $meetings,
        ]);
    }

    public function rec04Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->meetings as $m) {
            $meetingDate = ! empty($m['meeting_date']) && strtotime($m['meeting_date']) ? $m['meeting_date'] : null;
            $nextReview = ! empty($m['next_review_due']) && strtotime($m['next_review_due']) ? $m['next_review_due'] : null;

            RecToolboxTalk::updateOrCreate(
                ['id' => is_numeric($m['id']) ? $m['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'meeting_date' => $meetingDate,
                    'type' => $m['type'] ?? 'Toolbox Talk',
                    'topic' => $m['topic'] ?? '',
                    'facilitator' => $m['facilitator'] ?? '',
                    'attendees' => (int) ($m['attendees'] ?? 0),
                    'actions_raised' => (int) ($m['actions_raised'] ?? 0),
                    'notes' => $m['notes'] ?? '',
                    'next_review_due' => $nextReview,
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            RecToolboxTalk::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Toolbox talks saved successfully!');
    }

    public function rec05()
    {
        $ownerId = $this->getOwnerId();

        $logs = RecMaintenanceLog::where('business_owner_id', $ownerId)
            ->orderBy('next_due_date', 'asc')
            ->get();

        return Inertia::render('Administrator/RECForms/REC05', [
            'initialLogs' => $logs,
        ]);
    }

    public function rec05Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->logs as $log) {
            $lastService = ! empty($log['last_service_date']) && strtotime($log['last_service_date']) ? $log['last_service_date'] : null;
            $nextDue = ! empty($log['next_due_date']) && strtotime($log['next_due_date']) ? $log['next_due_date'] : null;

            RecMaintenanceLog::updateOrCreate(
                ['id' => is_numeric($log['id']) ? $log['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'type' => $log['type'] ?? '',
                    'description' => $log['description'] ?? '',
                    'serial_no' => $log['serial_no'] ?? '',
                    'location' => $log['location'] ?? '',
                    'notes' => $log['notes'] ?? '',
                    'last_service_date' => $lastService,
                    'next_due_date' => $nextDue,
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            RecMaintenanceLog::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Maintenance and calibration logs saved successfully!');
    }

    public function rec06()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC06', ['initialPlans' => []]);
        }

        $plans = RecItpPlan::where('business_owner_id', $ownerId)->get();

        return Inertia::render('Administrator/RECForms/REC06', [
            'initialPlans' => $plans,
        ]);
    }

    public function rec06Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->plans as $p) {
            RecItpPlan::updateOrCreate(
                ['id' => is_numeric($p['id']) ? $p['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'operation_activity' => $p['operation_activity'],
                    'controlling_documents' => $p['controlling_documents'],
                    'acceptance_criteria' => $p['acceptance_criteria'],
                    'verifying_document' => $p['verifying_document'],
                    'inspection_points_internal' => $p['inspection_points_internal'],
                    'inspection_points_external' => $p['inspection_points_external'],
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            RecItpPlan::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Inspection and test plan saved successfully!');
    }

    public function rec07()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC07');
        }

        $procedures = RecWeldProcedure::where('business_owner_id', $ownerId)->get();
        $welders = RecWelder::where('business_owner_id', $ownerId)
            ->with(['qualifications'])
            ->get();

        return Inertia::render('Administrator/RECForms/REC07', [
            'initialProcedures' => $procedures,
            'initialWelders' => $welders,
        ]);
    }

    public function rec07Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        // 1. Sync Procedures
        $procIdMap = []; // Mapping old/temp ID to new DB ID
        foreach ($request->procedures as $proc) {
            $p = RecWeldProcedure::updateOrCreate(
                ['id' => is_numeric($proc['id']) ? $proc['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'type' => $proc['type'],
                    'reference' => $proc['reference'],
                    'process' => $proc['process'],
                ]
            );
            $procIdMap[$proc['id']] = $p->id;
        }

        // 2. Sync Welders and their Qualifications
        foreach ($request->welders as $welder) {
            $w = RecWelder::updateOrCreate(
                ['id' => is_numeric($welder['id']) ? $welder['id'] : null, 'business_owner_id' => $ownerId],
                ['name' => $welder['name']]
            );

            // Sync qualifications for this welder
            if (isset($welder['qualifications'])) {
                foreach ($welder['qualifications'] as $qual) {
                    if (isset($qual['procedure_id'])) {
                        $dbProcId = isset($procIdMap[$qual['procedure_id']]) ? $procIdMap[$qual['procedure_id']] : $qual['procedure_id'];

                        // Avoid saving if ID is still temporary (though should be mapped)
                        if (is_numeric($dbProcId)) {
                            RecWelderQualification::updateOrCreate(
                                [
                                    'welder_id' => $w->id,
                                    'procedure_id' => $dbProcId,
                                    'qual_type' => $qual['qual_type'],
                                    'business_owner_id' => $ownerId,
                                ],
                                ['expiry_date' => (! empty($qual['expiry_date']) && strtotime($qual['expiry_date'])) ? $qual['expiry_date'] : null]
                            );
                        }
                    }
                }
            }
        }

        // 3. Handle Deletions
        if (! empty($request->deletedProcedureIds)) {
            RecWeldProcedure::whereIn('id', $request->deletedProcedureIds)->delete();
        }
        if (! empty($request->deletedWelderIds)) {
            RecWelder::whereIn('id', $request->deletedWelderIds)->delete();
        }

        return back()->with('success', 'Welding records saved successfully!');
    }

    public function rec08()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC08', ['initialReview' => null]);
        }

        $review = \App\Models\RecProjectReview::where('business_owner_id', $ownerId)
            ->with('jobs')
            ->first();

        return Inertia::render('Administrator/RECForms/REC08', [
            'initialReview' => $review,
        ]);
    }

    public function rec08Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        $reviewData = $request->except(['jobs']);
        $orderDate = ! empty($reviewData['order_date']) && strtotime($reviewData['order_date']) ? $reviewData['order_date'] : null;
        $estCompletion = ! empty($reviewData['est_completion']) && strtotime($reviewData['est_completion']) ? $reviewData['est_completion'] : null;
        $workshopDate = ! empty($reviewData['workshop_shipping_date']) && strtotime($reviewData['workshop_shipping_date']) ? $reviewData['workshop_shipping_date'] : null;

        $review = \App\Models\RecProjectReview::updateOrCreate(
            ['business_owner_id' => $ownerId],
            [
                'customer' => $reviewData['customer'] ?? null,
                'drawings_no' => $reviewData['drawings_no'] ?? null,
                'price' => $reviewData['price'] ?? null,
                'en1090' => $reviewData['en1090'] ?? null,
                'material_grades' => $reviewData['material_grades'] ?? null,
                'bolts' => $reviewData['bolts'] ?? null,
                'sub_contract' => $reviewData['sub_contract'] ?? null,
                'galvanizing' => $reviewData['galvanizing'] ?? null,
                'paint' => $reviewData['paint'] ?? null,
                'job_no' => $reviewData['job_no'] ?? null,
                'order_date' => $orderDate,
                'est_completion' => $estCompletion,
                'weld_types' => $reviewData['weld_types'] ?? null,
                'weld_inspection' => $reviewData['weld_inspection'] ?? null,
                'module_itp' => $reviewData['module_itp'] ?? null,
                'ncr_reqd' => $reviewData['ncr_reqd'] ?? null,
                'special_reqd' => $reviewData['special_reqd'] ?? null,
                'audit_monitoring_mpi' => $reviewData['audit_monitoring_mpi'] ?? null,
                'audit_monitoring_dpi' => $reviewData['audit_monitoring_dpi'] ?? null,
                'audit_monitoring_mag' => $reviewData['audit_monitoring_mag'] ?? null,
                'audit_monitoring_hardality' => $reviewData['audit_monitoring_hardality'] ?? null,
                'workshop_shipping_v1' => $reviewData['workshop_shipping_v1'] ?? null,
                'workshop_shipping_v2' => $reviewData['workshop_shipping_v2'] ?? null,
                'workshop_shipping_date' => $workshopDate,
                'comments' => $reviewData['comments'] ?? null,
                'office_sign_off' => $reviewData['office_sign_off'] ?? null,
            ]
        );

        if ($request->has('jobs')) {
            \App\Models\RecProductionJob::where('project_review_id', $review->id)->delete();
            foreach ($request->jobs as $job) {
                $jobDate = ! empty($job['date']) && strtotime($job['date']) ? $job['date'] : null;
                \App\Models\RecProductionJob::create([
                    'project_review_id' => $review->id,
                    'process' => $job['process'] ?? '',
                    'name' => $job['name'] ?? null,
                    'signature' => $job['signature'] ?? null,
                    'date' => $jobDate,
                ]);
            }
        }

        return back()->with('success', 'Project review saved successfully!');
    }

    public function rec09()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC09');
        }

        $suppliers = \App\Models\RecApprovedSupplier::where('business_owner_id', $ownerId)->get();

        return Inertia::render('Administrator/RECForms/REC09', [
            'initialSuppliers' => $suppliers,
        ]);
    }

    public function rec09Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->suppliers as $sup) {
            $expiryDate = ! empty($sup['expiry_date']) && strtotime($sup['expiry_date']) ? $sup['expiry_date'] : null;

            \App\Models\RecApprovedSupplier::updateOrCreate(
                ['id' => is_numeric($sup['id']) ? $sup['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'company' => $sup['company'] ?? '',
                    'service' => $sup['service'] ?? '',
                    'en1090' => $sup['en1090'] ?? 'No',
                    'iso9001' => $sup['iso9001'] ?? false,
                    'iso14001' => $sup['iso14001'] ?? false,
                    'iso45001' => $sup['iso45001'] ?? false,
                    'expiry_date' => $expiryDate,
                    'comments' => $sup['comments'] ?? '',
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            \App\Models\RecApprovedSupplier::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Suppliers saved successfully!');
    }

    public function rec10()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC10');
        }

        $order = \App\Models\RecPurchaseOrder::with('items')->where('business_owner_id', $ownerId)->latest()->first();

        return Inertia::render('Administrator/RECForms/REC10', [
            'initialOrder' => $order,
        ]);
    }

    public function rec10Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        $orderDate = ! empty($request->date) && strtotime($request->date) ? $request->date : null;

        $order = \App\Models\RecPurchaseOrder::updateOrCreate(
            ['id' => $request->id ?? null, 'business_owner_id' => $ownerId],
            [
                'company' => $request->company,
                'supplier' => $request->supplier,
                'del_address' => $request->delAddress,
                'po_number' => $request->poNumber,
                'job_number' => $request->jobNumber,
                'date' => $orderDate,
                'notes' => $request->notes,
                'ordered_by' => $request->orderedBy,
            ]
        );

        // Handle items
        $order->items()->delete();
        if ($request->has('items') && is_array($request->items)) {
            foreach ($request->items as $item) {
                if (! empty($item['description'])) {
                    $order->items()->create([
                        'item_no' => $item['id'] ?? null,
                        'description' => $item['description'] ?? null,
                        'unit' => $item['unit'] ?? null,
                        'qty' => $item['qty'] ?? null,
                        'cost_each' => $item['costEach'] ?? null,
                        'total_cost' => $item['totalCost'] ?? null,
                    ]);
                }
            }
        }

        return back()->with('success', 'Purchase Order saved successfully!');
    }

    public function rec11()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC11');
        }

        $notes = \App\Models\RecDeliveryNote::where('business_owner_id', $ownerId)->get();

        return Inertia::render('Administrator/RECForms/REC11', [
            'initialNotes' => $notes,
        ]);
    }

    public function rec11Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->notes as $note) {
            $deliveryDate = ! empty($note['deliveryDate']) && strtotime($note['deliveryDate']) ? $note['deliveryDate'] : null;

            \App\Models\RecDeliveryNote::updateOrCreate(
                ['id' => is_numeric($note['id']) ? $note['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'job_number' => $note['jobNumber'] ?? '',
                    'supplier' => $note['supplier'] ?? '',
                    'customer' => $note['customer'] ?? '',
                    'description' => $note['description'] ?? '',
                    'qty' => $note['qty'] ?? '',
                    'delivery_date' => $deliveryDate,
                    'received_by' => $note['receivedBy'] ?? '',
                    'notes' => $note['notes'] ?? '',
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            \App\Models\RecDeliveryNote::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Delivery Notes saved successfully!');
    }

    public function rec12()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC12');
        }

        $dops = \App\Models\RecDeclarationOfPerformance::where('business_owner_id', $ownerId)->get();

        return Inertia::render('Administrator/RECForms/REC12', [
            'initialDops' => $dops,
        ]);
    }

    public function rec12Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->dops as $dop) {
            $ukcaDate = ! empty($dop['date_of_ukca_marking']) && strtotime($dop['date_of_ukca_marking']) ? $dop['date_of_ukca_marking'] : null;

            \App\Models\RecDeclarationOfPerformance::updateOrCreate(
                ['id' => is_numeric($dop['id']) ? $dop['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'ukca_mark' => $dop['ukca_mark'] ?? '',
                    'manufacturer' => $dop['manufacturer'] ?? '',
                    'product_identification' => $dop['product_identification'] ?? '',
                    'intended_use' => $dop['intended_use'] ?? '',
                    'declared_performance' => $dop['declared_performance'] ?? '',
                    'notified_body' => $dop['notified_body'] ?? '',
                    'dop_reference' => $dop['dop_reference'] ?? '',
                    'date_of_ukca_marking' => $ukcaDate,
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            \App\Models\RecDeclarationOfPerformance::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Declarations of Performance saved successfully!');
    }

    public function rec13()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC13');
        }

        $ncrs = \App\Models\RecNonConformanceRegister::where('business_owner_id', $ownerId)->get();

        return Inertia::render('Administrator/RECForms/REC13', [
            'initialNcrs' => $ncrs,
        ]);
    }

    public function rec13Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->ncrs as $ncr) {
            $openedDate = ! empty($ncr['openedDate']) && strtotime($ncr['openedDate']) ? $ncr['openedDate'] : null;

            \App\Models\RecNonConformanceRegister::updateOrCreate(
                ['id' => is_numeric($ncr['id']) ? $ncr['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'job_no' => $ncr['jobNo'] ?? '',
                    'opened_date' => $openedDate,
                    'nrp_type' => $ncr['nrpType'] ?? '',
                    'issue_summary' => $ncr['issueSummary'] ?? '',
                    'root_cause' => $ncr['rootCause'] ?? '',
                    'action_taken' => $ncr['actionTaken'] ?? '',
                    'action_person' => $ncr['actionPerson'] ?? '',
                    'status' => $ncr['status'] ?? '',
                    'closed' => $ncr['closed'] ?? false,
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            \App\Models\RecNonConformanceRegister::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Non Conformance Register saved successfully!');
    }

    public function rec15()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC15');
        }

        $policies = \App\Models\RecCompanyPolicy::where('business_owner_id', $ownerId)->get();
        $company = \App\Models\Company::where('user_id', $ownerId)->first();

        return Inertia::render('Administrator/RECForms/REC15', [
            'initialPolicies' => $policies,
            'defaultCompanyName' => $company ? $company->company_name : ''
        ]);
    }

    public function rec15Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->policies as $p) {
            $policyDate = ! empty($p['date']) && strtotime($p['date']) ? $p['date'] : null;

            RecCompanyPolicy::updateOrCreate(
                [
                    'business_owner_id' => $ownerId,
                    'policy_type' => $p['policy_type'],
                ],
                [
                    'company_name' => $p['company_name'] ?? '',
                    'content' => $p['content'] ?? '',
                    'approved_by' => $p['approved_by'] ?? '',
                    'signature' => $p['signature'] ?? '',
                    'position' => $p['position'] ?? '',
                    'date' => $policyDate,
                ]
            );
        }

        return back()->with('success', 'Company Policies saved successfully!');
    }

    public function rec16()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC16');
        }

        $regs = \App\Models\RecLegalCompliance::where('business_owner_id', $ownerId)->get();

        return Inertia::render('Administrator/RECForms/REC16', [
            'initialRegs' => $regs,
        ]);
    }

    public function rec16Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->regs as $reg) {
            $nextReview = ! empty($reg['nextReview']) && strtotime($reg['nextReview']) ? $reg['nextReview'] : null;

            \App\Models\RecLegalCompliance::updateOrCreate(
                ['id' => is_numeric($reg['id']) ? $reg['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'regulation' => $reg['regulation'] ?? '',
                    'department' => $reg['department'] ?? '',
                    'status' => $reg['status'] ?? '',
                    'evidence' => $reg['evidence'] ?? '',
                    'responsible_person' => $reg['responsiblePerson'] ?? '',
                    'notes' => $reg['notes'] ?? '',
                    'frequency' => $reg['frequency'] ?? '',
                    'next_review' => $nextReview,
                    'document' => $reg['document'] ?? '',
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            \App\Models\RecLegalCompliance::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Legal Compliance Register saved successfully!');
    }

    public function rec18()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC18');
        }

        $review = \App\Models\RecManagementReview::with(['agendas', 'objectives', 'risks'])
            ->where('business_owner_id', $ownerId)
            ->first();

        return Inertia::render('Administrator/RECForms/REC18', [
            'initialReview' => $review,
        ]);
    }

    public function rec18Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        $data = $request->validate([
            'review' => 'required|array',
            'agendas' => 'array',
            'objectives' => 'array',
            'risks' => 'array',
        ]);

        $reviewData = $data['review'];

        $lastReviewDate = ! empty($reviewData['lastReviewDate']) && strtotime($reviewData['lastReviewDate']) ? $reviewData['lastReviewDate'] : null;
        $nextReviewDate = ! empty($reviewData['nextReviewDate']) && strtotime($reviewData['nextReviewDate']) ? $reviewData['nextReviewDate'] : null;
        $withDate = ! empty($reviewData['withDate']) && strtotime($reviewData['withDate']) ? $reviewData['withDate'] : null;

        $review = \App\Models\RecManagementReview::updateOrCreate(
            ['id' => isset($reviewData['id']) && is_numeric($reviewData['id']) ? $reviewData['id'] : null, 'business_owner_id' => $ownerId],
            [
                'last_review_date' => $lastReviewDate,
                'renewal_period' => $reviewData['renewalPeriod'] ?? 'Yearly',
                'link' => $reviewData['link'] ?? '',
                'next_review_date' => $nextReviewDate,
                'verified_by' => $reviewData['verifiedBy'] ?? '',
                'with_date' => $withDate,
                'verified_status' => $reviewData['verifiedStatus'] ?? 'Draft',
            ]
        );

        // Agendas
        $review->agendas()->delete();
        if (! empty($data['agendas'])) {
            $agendasToInsert = [];
            foreach ($data['agendas'] as $agenda) {
                $agendasToInsert[] = [
                    'desc' => $agenda['desc'] ?? '',
                    'link' => $agenda['link'] ?? '',
                    'unique' => $agenda['unique'] ?? '',
                    'evidence' => $agenda['evidence'] ?? '',
                    'owner' => $agenda['owner'] ?? '',
                    'status' => $agenda['status'] ?? '',
                ];
            }
            $review->agendas()->createMany($agendasToInsert);
        }

        // Objectives
        $review->objectives()->delete();
        if (! empty($data['objectives'])) {
            $objectivesToInsert = [];
            foreach ($data['objectives'] as $objective) {
                $objectivesToInsert[] = [
                    'obj' => $objective['obj'] ?? '',
                    'ref' => $objective['ref'] ?? '',
                    'review' => $objective['review'] ?? '',
                    'evidence' => $objective['evidence'] ?? '',
                    'status' => $objective['status'] ?? '',
                ];
            }
            $review->objectives()->createMany($objectivesToInsert);
        }

        // Risks
        $review->risks()->delete();
        if (! empty($data['risks'])) {
            $risksToInsert = [];
            foreach ($data['risks'] as $risk) {
                $risksToInsert[] = [
                    'desc' => $risk['desc'] ?? '',
                    'link' => $risk['link'] ?? '',
                    'unique' => $risk['unique'] ?? '',
                    'risk_opp' => $risk['riskOpp'] ?? '',
                    'evidence' => $risk['evidence'] ?? '',
                    'owner' => $risk['owner'] ?? '',
                    'status' => $risk['status'] ?? '',
                ];
            }
            $review->risks()->createMany($risksToInsert);
        }

        return back()->with('success', 'Management Review saved successfully!');
    }

    public function rec19()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC19');
        }

        $aspects = \App\Models\RecAspectsHazardsRegister::where('business_owner_id', $ownerId)->get();

        return Inertia::render('Administrator/RECForms/REC19', [
            'initialAspects' => $aspects,
        ]);
    }

    public function rec19Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        foreach ($request->aspects as $aspect) {
            $date = ! empty($aspect['date']) && strtotime($aspect['date']) ? $aspect['date'] : null;
            $nextReview = ! empty($aspect['nextReview']) && strtotime($aspect['nextReview']) ? $aspect['nextReview'] : null;

            \App\Models\RecAspectsHazardsRegister::updateOrCreate(
                ['id' => is_numeric($aspect['id']) ? $aspect['id'] : null, 'business_owner_id' => $ownerId],
                [
                    'aspect' => $aspect['aspect'] ?? '',
                    'hazard' => $aspect['hazard'] ?? '',
                    'impact' => $aspect['impact'] ?? '',
                    'risk_rating' => $aspect['riskRating'] ?? '',
                    'control_measures' => $aspect['controlMeasures'] ?? '',
                    'average_risk' => $aspect['averageRisk'] ?? '',
                    'date' => $date,
                    'next_review' => $nextReview,
                ]
            );
        }

        if (! empty($request->deletedIds)) {
            \App\Models\RecAspectsHazardsRegister::whereIn('id', $request->deletedIds)->delete();
        }

        return back()->with('success', 'Aspects, Hazards, and Impacts Register saved successfully!');
    }

    public function rec29()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC29');
        }

        $checklist = RecSafetyChecklist::with('items')
            ->where('business_owner_id', $ownerId)
            ->first();

        return Inertia::render('Administrator/RECForms/REC29', [
            'initialChecklist' => $checklist,
        ]);
    }

    public function rec29Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        $checklistData = $request->validate([
            'checklist' => 'required|array',
            'items' => 'array',
        ]);

        $mainData = $checklistData['checklist'];

        $lastReviewDate = ! empty($mainData['lastReviewDate']) && strtotime($mainData['lastReviewDate']) ? $mainData['lastReviewDate'] : null;
        $withDate = ! empty($mainData['withDate']) && strtotime($mainData['withDate']) ? $mainData['withDate'] : null;

        $checklist = RecSafetyChecklist::updateOrCreate(
            ['id' => isset($mainData['id']) && is_numeric($mainData['id']) ? $mainData['id'] : null, 'business_owner_id' => $ownerId],
            [
                'last_review_date' => $lastReviewDate,
                'default_renewal_period' => $mainData['defaultRenewalPeriod'] ?? 6,
                'unit' => $mainData['unit'] ?? 'Months',
                'verified_by' => $mainData['verifiedBy'] ?? '',
                'with_date' => $withDate,
                'status' => $mainData['status'] ?? 'Draft',
            ]
        );

        // Sync items
        $checklist->items()->delete();
        if (! empty($checklistData['items'])) {
            $itemsToInsert = [];
            foreach ($checklistData['items'] as $item) {
                if (! empty($item['equipmentType'])) {
                    $itemsToInsert[] = [
                        'equipment_type' => $item['equipmentType'] ?? '',
                        'location' => $item['location'] ?? '',
                        'checked_by' => $item['checkedBy'] ?? '',
                        'condition' => $item['condition'] ?? '',
                        'action_required' => $item['actionRequired'] ?? '',
                        'notes' => $item['notes'] ?? '',
                        'date_checked' => (! empty($item['dateChecked']) && strtotime($item['dateChecked'])) ? $item['dateChecked'] : null,
                        'next_review_due' => (! empty($item['nextReviewDue']) && strtotime($item['nextReviewDue'])) ? $item['nextReviewDue'] : null,
                    ];
                }
            }
            if (count($itemsToInsert) > 0) {
                $checklist->items()->createMany($itemsToInsert);
            }
        }

        return back()->with('success', 'Safety Equipment Checklist saved successfully!');
    }

    public function rec26()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC26');
        }

        $drill = RecEmergencyDrill::with('items')
            ->where('business_owner_id', $ownerId)
            ->first();

        return Inertia::render('Administrator/RECForms/REC26', [
            'initialDrill' => $drill,
        ]);
    }

    public function rec26Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        $requestData = $request->validate([
            'drill' => 'required|array',
            'items' => 'array',
        ]);

        $mainData = $requestData['drill'];

        $lastReviewDate = ! empty($mainData['lastReviewDate']) && strtotime($mainData['lastReviewDate']) ? $mainData['lastReviewDate'] : null;
        $withDate = ! empty($mainData['withDate']) && strtotime($mainData['withDate']) ? $mainData['withDate'] : null;

        $drill = RecEmergencyDrill::updateOrCreate(
            ['id' => isset($mainData['id']) && is_numeric($mainData['id']) ? $mainData['id'] : null, 'business_owner_id' => $ownerId],
            [
                'last_review_date' => $lastReviewDate,
                'default_renewal_period' => $mainData['defaultRenewalPeriod'] ?? 6,
                'unit' => $mainData['unit'] ?? 'Months',
                'verified_by' => $mainData['verifiedBy'] ?? '',
                'with_date' => $withDate,
                'status' => $mainData['status'] ?? 'Draft',
            ]
        );

        $drill->items()->delete();
        if (! empty($requestData['items'])) {
            $itemsToInsert = [];
            foreach ($requestData['items'] as $item) {
                if (! empty($item['drillType'])) {
                    $itemsToInsert[] = [
                        'drill_type' => $item['drillType'] ?? '',
                        'participants' => $item['participants'] ?? 0,
                        'outcome' => $item['outcome'] ?? '',
                        'issues_found' => $item['issuesFound'] ?? '',
                        'follow_up_action' => $item['followUpAction'] ?? '',
                        'notes' => $item['notes'] ?? '',
                        'date' => (! empty($item['date']) && strtotime($item['date'])) ? $item['date'] : null,
                        'next_drill_due' => (! empty($item['nextDrillDue']) && strtotime($item['nextDrillDue'])) ? $item['nextDrillDue'] : null,
                    ];
                }
            }
            if (count($itemsToInsert) > 0) {
                $drill->items()->createMany($itemsToInsert);
            }
        }

        return back()->with('success', 'Emergency Drill record saved successfully!');
    }

    public function rec27()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC27');
        }

        $monitoring = RecMonitoring::with('items')
            ->where('business_owner_id', $ownerId)
            ->first();

        return Inertia::render('Administrator/RECForms/REC27', [
            'initialMonitoring' => $monitoring,
        ]);
    }

    public function rec27Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        $requestData = $request->validate([
            'monitoring' => 'required|array',
            'items' => 'array',
        ]);

        $mainData = $requestData['monitoring'];

        $lastReviewDate = ! empty($mainData['lastReviewDate']) && strtotime($mainData['lastReviewDate']) ? $mainData['lastReviewDate'] : null;
        $withDate = ! empty($mainData['withDate']) && strtotime($mainData['withDate']) ? $mainData['withDate'] : null;

        $monitoring = RecMonitoring::updateOrCreate(
            ['id' => isset($mainData['id']) && is_numeric($mainData['id']) ? $mainData['id'] : null, 'business_owner_id' => $ownerId],
            [
                'last_review_date' => $lastReviewDate,
                'default_renewal_period' => $mainData['defaultRenewalPeriod'] ?? 6,
                'unit' => $mainData['unit'] ?? 'Months',
                'verified_by' => $mainData['verifiedBy'] ?? '',
                'with_date' => $withDate,
                'status' => $mainData['status'] ?? 'Draft',
            ]
        );

        $monitoring->items()->delete();
        if (! empty($requestData['items'])) {
            $itemsToInsert = [];
            foreach ($requestData['items'] as $item) {
                if (! empty($item['parameter'])) {
                    $itemsToInsert[] = [
                        'parameter' => $item['parameter'] ?? '',
                        'unit' => $item['unit'] ?? '',
                        'method' => $item['method'] ?? '',
                        'result' => $item['result'] ?? '',
                        'limit' => $item['limit'] ?? '',
                        'action_required' => $item['actionRequired'] ?? '',
                        'notes' => $item['notes'] ?? '',
                        'frequency' => $item['frequency'] ?? '',
                        'next_review_due' => (! empty($item['nextReviewDue']) && strtotime($item['nextReviewDue'])) ? $item['nextReviewDue'] : null,
                    ];
                }
            }
            if (count($itemsToInsert) > 0) {
                $monitoring->items()->createMany($itemsToInsert);
            }
        }

        return back()->with('success', 'Monitoring record saved successfully!');
    }

    public function rec28()
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return Inertia::render('Administrator/RECForms/REC28');
        }

        $surv = RecOccupHealthSurv::with('items')
            ->where('business_owner_id', $ownerId)
            ->first();

        return Inertia::render('Administrator/RECForms/REC28', [
            'initialSurv' => $surv,
        ]);
    }

    public function rec28Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (! $ownerId) {
            return back()->with('error', 'Unauthorized');
        }

        $requestData = $request->validate([
            'surv' => 'required|array',
            'items' => 'array',
        ]);

        $mainData = $requestData['surv'];

        $lastReviewDate = ! empty($mainData['lastReviewDate']) && strtotime($mainData['lastReviewDate']) ? $mainData['lastReviewDate'] : null;
        $withDate = ! empty($mainData['withDate']) && strtotime($mainData['withDate']) ? $mainData['withDate'] : null;

        $surv = RecOccupHealthSurv::updateOrCreate(
            ['id' => isset($mainData['id']) && is_numeric($mainData['id']) ? $mainData['id'] : null, 'business_owner_id' => $ownerId],
            [
                'last_review_date' => $lastReviewDate,
                'default_renewal_period' => $mainData['defaultRenewalPeriod'] ?? 1,
                'unit' => $mainData['unit'] ?? 'Years',
                'verified_by' => $mainData['verifiedBy'] ?? '',
                'with_date' => $withDate,
                'status' => $mainData['status'] ?? 'Draft',
            ]
        );

        $surv->items()->delete();
        if (! empty($requestData['items'])) {
            $itemsToInsert = [];
            foreach ($requestData['items'] as $item) {
                if (! empty($item['employeeName'])) {
                    $itemsToInsert[] = [
                        'employee_name' => $item['employeeName'] ?? '',
                        'staff_no' => $item['staffNo'] ?? '',
                        'job_role' => $item['jobRole'] ?? '',
                        'exposure_type' => $item['exposureType'] ?? '',
                        'assessor' => $item['assessor'] ?? '',
                        'findings' => $item['findings'] ?? '',
                        'follow_up_required' => $item['followUpRequired'] ?? '',
                        'notes' => $item['notes'] ?? '',
                        'date_of_assessment' => (! empty($item['dateOfAssessment']) && strtotime($item['dateOfAssessment'])) ? $item['dateOfAssessment'] : null,
                        'next_due' => (! empty($item['nextDue']) && strtotime($item['nextDue'])) ? $item['nextDue'] : null,
                    ];
                }
            }
            if (count($itemsToInsert) > 0) {
                $surv->items()->createMany($itemsToInsert);
            }
        }

        return back()->with('success', 'Occupational Health Surveillance Log saved successfully!');
    }

    public function rec22()
    {
        $ownerId = $this->getOwnerId();
        if (!$ownerId) return Inertia::render('Administrator/RECForms/REC22');

        $monitor = \App\Models\RecMonitorMeasure::with('items')->where('business_owner_id', $ownerId)->first();

        return Inertia::render('Administrator/RECForms/REC22', [
            'initialMonitor' => $monitor,
        ]);
    }

    public function rec22Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (!$ownerId) return back()->with('error', 'Unauthorized');

        $data = $request->validate([
            'monitor' => 'required|array',
            'items' => 'array',
        ]);

        $main = $data['monitor'];
        $lastReview = !empty($main['lastReviewDate']) && strtotime($main['lastReviewDate']) ? $main['lastReviewDate'] : null;
        $withDate = !empty($main['withDate']) && strtotime($main['withDate']) ? $main['withDate'] : null;

        $monitor = \App\Models\RecMonitorMeasure::updateOrCreate(
            ['id' => isset($main['id']) ? $main['id'] : null, 'business_owner_id' => $ownerId],
            [
                'last_review_date' => $lastReview,
                'renewal_period' => $main['renewalPeriod'] ?? 1,
                'renewal_unit' => $main['renewalUnit'] ?? 'Years',
                'verified_by' => $main['verifiedBy'] ?? '',
                'with_date' => $withDate,
                'status' => $main['status'] ?? 'Draft',
            ]
        );

        $monitor->items()->delete();
        if (!empty($data['items'])) {
            foreach ($data['items'] as $item) {
                if (!empty($item['parameter'])) {
                    $monitor->items()->create([
                        'parameter' => $item['parameter'],
                        'unit' => $item['unit'] ?? '',
                        'method' => $item['method'] ?? '',
                        'result' => $item['result'] ?? '',
                        'limit' => $item['limit'] ?? '',
                        'action_required' => $item['actionRequired'] ?? '',
                        'notes' => $item['notes'] ?? '',
                        'frequency' => $item['frequency'] ?? '',
                        'next_review_due' => !empty($item['nextReviewDue']) && strtotime($item['nextReviewDue']) ? $item['nextReviewDue'] : null,
                    ]);
                }
            }
        }

        return back()->with('success', 'Monitor & Measure record saved!');
    }

    public function rec23()
    {
        $ownerId = $this->getOwnerId();
        if (!$ownerId) return Inertia::render('Administrator/RECForms/REC23');

        $incident = \App\Models\RecIncidentInvestigation::with('items')->where('business_owner_id', $ownerId)->first();

        return Inertia::render('Administrator/RECForms/REC23', [
            'initialIncident' => $incident,
        ]);
    }

    public function rec23Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (!$ownerId) return back()->with('error', 'Unauthorized');

        $data = $request->validate([
            'incident' => 'required|array',
            'items' => 'array',
        ]);

        $main = $data['incident'];
        $lastReview = !empty($main['lastReviewDate']) && strtotime($main['lastReviewDate']) ? $main['lastReviewDate'] : null;

        $incident = \App\Models\RecIncidentInvestigation::updateOrCreate(
            ['id' => isset($main['id']) ? $main['id'] : null, 'business_owner_id' => $ownerId],
            [
                'last_review_date' => $lastReview,
                'status' => $main['status'] ?? 'Draft',
            ]
        );

        $incident->items()->delete();
        if (!empty($data['items'])) {
            foreach ($data['items'] as $item) {
                if (!empty($item['occurrenceDate'])) {
                    $incident->items()->create([
                        'occurrence_date' => $item['occurrenceDate'],
                        'location' => $item['location'] ?? '',
                        'incident_description' => $item['incidentDescription'] ?? '',
                        'immediate_action' => $item['immediateAction'] ?? '',
                        'root_cause' => $item['rootCause'] ?? '',
                        'corrective_action' => $item['correctiveAction'] ?? '',
                        'preventive_action' => $item['preventiveAction'] ?? '',
                        'notes' => $item['notes'] ?? '',
                        'forecasted_closure_date' => !empty($item['forecastedClosureDate']) && strtotime($item['forecastedClosureDate']) ? $item['forecastedClosureDate'] : null,
                        'closed' => $item['closed'] ?? 'No',
                    ]);
                }
            }
        }

        return back()->with('success', 'Incident Investigation report saved!');
    }

    public function rec24()
    {
        $ownerId = $this->getOwnerId();
        if (!$ownerId) return Inertia::render('Administrator/RECForms/REC24');

        $waste = \App\Models\RecWasteHandling::with('items')->where('business_owner_id', $ownerId)->first();

        return Inertia::render('Administrator/RECForms/REC24', [
            'initialWaste' => $waste,
        ]);
    }

    public function rec24Store(Request $request)
    {
        $ownerId = $this->getOwnerId();
        if (!$ownerId) return back()->with('error', 'Unauthorized');

        $data = $request->validate([
            'waste' => 'required|array',
            'items' => 'array',
        ]);

        $main = $data['waste'];
        $lastReview = !empty($main['lastReviewDate']) && strtotime($main['lastReviewDate']) ? $main['lastReviewDate'] : null;

        $waste = \App\Models\RecWasteHandling::updateOrCreate(
            ['id' => isset($main['id']) ? $main['id'] : null, 'business_owner_id' => $ownerId],
            [
                'last_review_date' => $lastReview,
                'status' => $main['status'] ?? 'Draft',
            ]
        );

        $waste->items()->delete();
        if (!empty($data['items'])) {
            foreach ($data['items'] as $item) {
                if (!empty($item['wasteType'])) {
                    $waste->items()->create([
                        'waste_type' => $item['wasteType'],
                        'quantity' => $item['quantity'] ?? '',
                        'disposal_method' => $item['disposalMethod'] ?? '',
                        'contractor' => $item['contractor'] ?? '',
                        'notes_number' => $item['notesNumber'] ?? '',
                        'date' => !empty($item['date']) && strtotime($item['date']) ? $item['date'] : null,
                    ]);
                }
            }
        }

        return back()->with('success', 'Waste Handling record saved!');
    }
}
