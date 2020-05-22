import { ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from './app.error';

export class AppErrorhanler implements ErrorHandler{
    handleError(error){
       alert('Unknown Error!!!');
    }
}
