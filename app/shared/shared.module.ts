import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownComponent } from "./dropdown.component/dropdown.component";
import { ExcludeObjectFilterPipe } from "./Pipes/exclude-object.pipe";
import { IdentifierGeneratorService } from "./Services/identifier-generator.service";

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    DropdownComponent
  ],
  declarations: [
    DropdownComponent,
    ExcludeObjectFilterPipe],
    providers: [IdentifierGeneratorService]
})
export class SharedModule { }
