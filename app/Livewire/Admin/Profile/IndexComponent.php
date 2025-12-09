<?php

namespace App\Livewire\Admin\Profile;

use Livewire\Component;

class IndexComponent extends Component
{
    public function render()
    {
        return view('livewire.admin.profile.index-component')->layout('layouts.backend.app');
    }
}
