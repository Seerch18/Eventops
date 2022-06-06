import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EtiquetaService } from '../../../services/etiquetas/etiqueta.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
})
export class ChipsComponent implements OnInit {
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public frmTags = new FormControl();
  public filteredTags: Observable<string[]>;
  public tags: string[] = [];
  // public allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  private allTags: Array<any>;

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(private etiquetaService: EtiquetaService) {
    this.allTags = [];
    this.filteredTags = new Observable;
  }

  ngOnInit(): void {
    this.getTags();
    this.filteredTags = this.frmTags.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allTags.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.frmTags.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.frmTags.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  getTags() {
    this.etiquetaService.readTags().subscribe((tags) => {
      tags.forEach((element:any) => {
        this.allTags.push(element.nombre);
      });
      console.log(this.allTags);
    });
  }
}
