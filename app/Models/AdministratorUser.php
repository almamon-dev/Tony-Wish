<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdministratorUser extends Model
{
    protected $fillable = [
        'user_id',
        'administrator_id',
        'phone_number',
        'employee_id',
        'start_date',
        'department',
        'role',
        'position_title',
        'reporting_to',
        'view_report',
        'upload_document',
        'edit_procedure',
        'manage_task',
        'office_location',
        'time_zone',
        'preferred_language',
        'additional_notes',
        'is_active',
    ];

    protected $casts = [
        'view_report' => 'boolean',
        'upload_document' => 'boolean',
        'edit_procedure' => 'boolean',
        'manage_task' => 'boolean',
        'start_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Get the user associated with this administrator profile
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the business owner who added this administrator
     */
    public function addedBy()
    {
        return $this->belongsTo(User::class, 'administrator_id');
    }

    /**
     * Get the manager of this user
     */
    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
