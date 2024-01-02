import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter();
  categoriesSubscription: Subscription | undefined;
  categories: string[] | undefined;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
