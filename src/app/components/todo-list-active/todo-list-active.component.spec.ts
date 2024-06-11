import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListActiveComponent } from './todo-list-active.component';

describe('TodoListActiveComponent', () => {
  let component: TodoListActiveComponent;
  let fixture: ComponentFixture<TodoListActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListActiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
