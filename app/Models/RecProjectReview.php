<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecProjectReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer',
        'drawings_no',
        'price',
        'en1090',
        'material_grades',
        'bolts',
        'sub_contract',
        'galvanizing',
        'paint',
        'job_no',
        'order_date',
        'est_completion',
        'weld_types',
        'weld_inspection',
        'module_itp',
        'ncr_reqd',
        'special_reqd',
        'audit_monitoring_mpi',
        'audit_monitoring_dpi',
        'audit_monitoring_mag',
        'audit_monitoring_hardality',
        'workshop_shipping_v1',
        'workshop_shipping_v2',
        'workshop_shipping_date',
        'comments',
        'office_sign_off',
        'business_owner_id'
    ];

    public function jobs()
    {
        return $this->hasMany(RecProductionJob::class, 'project_review_id');
    }
}
