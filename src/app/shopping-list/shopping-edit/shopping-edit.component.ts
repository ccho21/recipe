import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  subscription: Subscription;
  editedItemIndex: number;
  @ViewChild('f', { static: false }) slForm: NgForm;
  editedItem: Ingredient;
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.slService.startedEditing.subscribe((index: number) => {
      console.log(index);
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });      
    });
  }

  onAddItem(form: NgForm) {
    console.log(form);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
