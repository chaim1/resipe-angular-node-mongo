import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  dataWords: object = {
    "en": {
      "ContentLoginRegister": {
        "direction":"ltr",
        "TitleRegister": "Sign up to watch people's recipes and share recipes",
        "ButoonRegister":"Sign up",
        "ApprovalOfTermsOfUse":"By registering, you agree to the",
        "TermsOfUseButton":"Terms of Use",
        "HaveAnAccountRegister":"Have an account?",
        "ButtonRegister":"Sign in",
        "ToViewWithoutRegistration":"To view without registration",
        "ButtonClicHere":"Click here",
        "DoNotHaveAnAccountLogin":"Do not have an account?",
        "ForgotPassword":"Forgot password!",
        "RequiredField":"This line is required.",
        "RequiredFieldEmail":"Enter a valid email address.",
        "SkipImage":"דלג",
        "SendImageUser":"הוסף תמונה",
        "ButoonSelectImage":"בחר תמונה",
        "errorImg":"משהו לא עבד נסה שוב"
      },
      "PlaceHoldersLogin": {
        "EmailOrUsername": "Email or Username",
        "Password": "Password"
      },
      "PlaceHoldersRegister": {
        "Email": "Email",
        "FullName": "Full name",
        "UserName": "Username",
        "Password": "Password"
      },
      "massageForUser":{
        "Password":"Create a password at least 5 characters long."
      },
      "errorsServer":{
        1:"סיסמה חייבת להכיל 5 תווים לפחות",
        2:"אימייל קיים במערכת",
        3:"שם משתמש תפוס נסה שם אחר",
        4:" משהו השתבשש רענן את הדף ונסה שוב",
        5:"אימייל או סיסמה שגויים",
        6:"משהו לא עבד נסה שוב"
      },
      "newPost":{
        "headerImg": "New Post Image",
        "next": "Next",
        "headerIngredients": "Ingredients",
        "headerInstructions": "Instructions",
        "share": "Share",
        "back": "Back",
        "nameRecipe":"Name of the recipe"
      },
      "home":{
        "Ingredients":"Ingredients",
        "Instructions": "Instructions"
      }
    },
    "he": {
      "ContentLoginRegister": {
        "direction":"rtl",
        "TitleRegister": "הירשם כדי לצפות במתכונים של אנשים ולשתף מתכונים",
        "ButoonRegister":"הירשם",
        "ApprovalOfTermsOfUse":"בהרשמה הינך מאשר את",
        "TermsOfUseButton":"תנאי שימוש",
        "HaveAnAccountRegister":"יש לך חשבון?",
        "ButtonRegister":"היכנס",
        "ToViewWithoutRegistration":"לצפייה ללא הרשמה",
        "ButtonClicHere":"לחץ כאן",
        "DoNotHaveAnAccountLogin":"אין לך חשבון?",
        "ForgotPassword":"!שכחתי סיסמה",
        "RequiredField":"שדה חובה",
        "RequiredFieldEmail":"הכנס כתובת אימייל תקינה",
        "OnAddImage":"יהיה מגניב אם תוסיפ/י תמונת פרופיל",
        "SkipImage":"דלג",
        "SendImageUser":"הוסף תמונה",
        "ButoonSelectImage":"בחר תמונה",
        "errorImg":"משהו לא עבד נסה שוב"
      },
      "PlaceHoldersLogin": {
        "EmailOrUsername": "אימייל או שם משתמש",
        "Password": "סיסמה"
      },
      "PlaceHoldersRegister": {
        "Email": "אימייל",
        "FullName": "שם מלא",
        "UserName": "שם משתמש",
        "Password": "סיסמה"
      },
      "massageForUser":{
        "Password":"סיסמה חייבת להכיל 5 תווים לפחות"
      },
      "errorsServer":{
        1:"סיסמה חייבת להכיל 5 תווים לפחות",
        2:"אימייל קיים במערכת",
        3:"שם משתמש תפוס נסה שם אחר",
        4:" משהו השתבשש רענן את הדף ונסה שוב",
        5:"אימייל או סיסמה שגויים",
        6:"משהו לא עבד נסה שוב"
      },
      "newPost":{
        "headerImg": "פוסט חדש",
        "next": "הבא",
        "headerIngredients": "מרכיבים",
        "headerInstructions": "הוראות הכנה",
        "share": "פרסם",
        "back": "חזור",
        "nameRecipe": "שם המתכון"
      },
      "home":{
        "Ingredients":"מרכיבים",
        "Instructions": "הוראות הכנה"
      }
    }
  }
  constructor() {

  }
  returnContectLanguage() {
    // if(navigator.language == 'he'){
    //   return this.dataWords['he'];
    // }else{
    //   return this.dataWords['en'];
    // }
          return this.dataWords['he'];

  }

}
