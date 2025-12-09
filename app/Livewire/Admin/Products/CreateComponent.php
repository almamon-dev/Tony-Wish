<?php

namespace App\Livewire\Admin\Products;

use Livewire\Component;

class CreateComponent extends Component
{
    public function render()
    {
        return view('livewire.admin.products.create-component')->layout('layouts.backend.app');
    }
}
