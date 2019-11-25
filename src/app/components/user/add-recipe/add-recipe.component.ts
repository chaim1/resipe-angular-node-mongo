import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { LanguagesService } from 'src/app/services/languages.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  fromData: FormGroup;
  imageData: FormGroup;
  img;
  imagePreview;
  imageValid;
  contentWords;
  viewImage = true;
  viewIngredients = true;
  viewInstructions = true;
  loader = false;
  redColor = false;
  ingredientValid = false;
  InstructionsValid = false;
  constructor(
    private route: ActivatedRoute,
    private postServise: PostsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private languagesService: LanguagesService) {
    this.contentWords = this.languagesService.returnContectLanguage();

    this.imageData = new FormGroup({
      imagePost: new FormControl(null)
    });
    this.imageData = this.formBuilder.group({
      imagePost: this.postServise.getImageForView()
    });
  }

  ngOnInit() {
    this.fromData = new FormGroup({
      postTitle: new FormControl(null, [Validators.required]),
      ingredients: new FormArray([]),
      Instructions: new FormControl(null)
    });
    if (this.imageData.value.imagePost) {
      this.imageData.get('imagePost').updateValueAndValidity();
      if (this.imageData.get('imagePost').value.type.substring(0, 5) === 'image') {
        this.imageValid = true;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.imageData.value.imagePost);

    } else {
      this.router.navigate(['home']);
    }
    this.fromData.valueChanges.subscribe(
      (value) => {
        if (value.Instructions) {
          this.InstructionsValid = false;
        }
      });
  }


  onAddImageForm() {

  }
  cancel() {
    this.router.navigate(['home']);
  }
  onNextPhoto() {
    this.viewImage = false;
  }
  backToImage() {
    this.viewImage = true;
  }
  onAddIngredients() {
    this.ingredientValid = false;
    if (this.fromData.value.ingredients.length > 0 && this.fromData.value.ingredients[this.fromData.value.ingredients.length - 1] == null) {
      this.ingredientValid = true;
    } else {
      const control = new FormControl(null, Validators.required);
      (<FormArray>this.fromData.get('ingredients')).push(control);
    }
  }
  removeIngredient(i) {
    (<FormArray>this.fromData.get('ingredients')).removeAt(i);
  }
  onNextIngredients() {
    if (!this.fromData.value.postTitle) {
      this.redColor = true;
      return;
    } else if (this.fromData.value.ingredients.length === 0) {
      this.ingredientValid = true;
      return;
    }

    this.viewIngredients = false;
  }
  backToIngredients() {
    this.viewIngredients = true;
  }
  sharePost() {
    if (!this.fromData.value.Instructions) {
      this.InstructionsValid = true;
      return;
    }
    this.postServise.createPost(
      this.fromData.value.postTitle,
      this.fromData.value.Instructions,
      this.imageData.value.imagePost).
      subscribe(res => {
        console.log(res);
        for(let i = 0 ; i <this.fromData.value.ingredients.length; i++){
          this.postServise.setIngredient(this.fromData.value.ingredients[i], res.postId).subscribe(result => {
            console.log(result);
          });
        }
      });
    this.loader = true;
  }
}
