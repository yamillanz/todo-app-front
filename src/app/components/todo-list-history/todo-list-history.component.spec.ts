import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListHistoryComponent } from './todo-list-history.component';

describe('TodoListHistoryComponent', () => {
  let component: TodoListHistoryComponent;
  let fixture: ComponentFixture<TodoListHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
