<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobTitleManage extends Model
{
    protected $table = 'job_title_manages';

    protected $fillable = [
        'name',
        'description',
        'status',
    ];
}
