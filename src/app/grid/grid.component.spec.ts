import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('----> GridComponent <----', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when component is checked, then it should return true.', () => {
    expect(component).toBeTruthy();
  });


  it('when createRange(2) will be called then it will return  [1,2]', () => {
    expect(component.createRange(2)).toEqual([1, 2]);
  });

  it('when  CamelCase() method will be called with "user_name" then it will return "User Name"', () => {
    expect(component.CamelCase('user_name')).toEqual('User Name');
  });

  it('when  CamelCase() method will be called with "userName" then it will return "User Name"', () => {
    expect(component.CamelCase('userName')).toEqual('User Name');
  });


  it('when no value is set for CustomBtnText setter, then _customBtnText should be "Custom".', () => {
    expect(component._customBtnText).toEqual('Custom');
  });


  it('when "Make Appointment" is set for CustomBtnText setter, then _customBtnText should be "Make Appointment"', () => {
    component._customBtnText = 'Make Appointment';
    expect(component._customBtnText).toEqual('Make Appointment');
  });
  it('when null is set for CustomBtnText setter, then _customBtnText should be "Custom"', () => {
    component.CustomBtnText = null;
    expect(component._customBtnText).toEqual('Custom');
  });

  it('when data is set with length 1 array, then _data should be 1 also', () => {

    component.data = [{}];
    expect(component._data.length).toEqual(1);
  });


  it('when data is set with length zero array, then _data should be zero also', () => {
    component.data = [];
    expect(component._data.length).toEqual(0);

  });



  it('when showcol is set with array, then _showcol have same value', () => {
    component.showcol = ['id'];
    expect(component._showcol).toEqual(['id']);

  });


  it('when data has two row then there will be 3 table row in grid.', async(() => {
    // spyOn(component, 'onEditButtonClick');
    component.data = [{ id: '' }, { id: '3' }];
    fixture.detectChanges();
    let tableref = fixture.debugElement.queryAll(By.css('.table tr'));

    expect(tableref.length).toEqual(3);

  }));

  it('when data has two row and canDelete is set true then there will be 2 Delete Button in grid.', async(() => {
    // spyOn(component, 'onEditButtonClick');
    component.data = [{ id: '' }, { id: '3' }];
    component.canDelete=true;
    fixture.detectChanges();
    let resultref = fixture.debugElement.queryAll(By.css('.table .deletebtn'));

    expect(resultref.length).toEqual(2);

  }));

  it('when data has two row and canDelete is set false then there will be 0 Delete Button in grid.', async(() => {
    // spyOn(component, 'onEditButtonClick');
    component.data = [{ id: '' }, { id: '3' }];
    component.canDelete=false;
    fixture.detectChanges();

    let resultref = fixture.debugElement.queryAll(By.css('.table .deletebtn'));

    expect(resultref.length).toEqual(0);

  }));



  it('when data has two row and canEdit is set true then there will be 2 Edit Button in grid.', async(() => {
    // spyOn(component, 'onEditButtonClick');
    component.data = [{ id: '' }, { id: '3' }];
    component.canEdit=true;
    fixture.detectChanges();
    let resultref = fixture.debugElement.queryAll(By.css('.table .editbtn'));

    expect(resultref.length).toEqual(2);

  }));

  it('when data has two row and canEdit is set false then there will be 0 Edit Button in grid.', async(() => {
    // spyOn(component, 'onEditButtonClick');
    component.data = [{ id: '' }, { id: '3' }];
    component.canEdit=false;
    fixture.detectChanges();
    let resultref = fixture.debugElement.queryAll(By.css('.table .editbtn'));

    expect(resultref.length).toEqual(0);

  }));

  it('when data has two row and isCustomBtn is set true then there will be 2 Custom Button in grid.', async(() => {
    // spyOn(component, 'onEditButtonClick');
    component.data = [{ id: '' }, { id: '3' }];
    component.isCustomBtn=true;
    fixture.detectChanges();
    let resultref = fixture.debugElement.queryAll(By.css('.table .custombtn'));
    debugger;
    expect(resultref.length).toEqual(2);

  }));

  it('when data has two row and isCustomBtn is set false then there will be 0 Custom Button in grid.', async(() => {
    // spyOn(component, 'onEditButtonClick');
    component.data = [{ id: '' }, { id: '3' }];
    component.isCustomBtn=false;
    fixture.detectChanges();
    let resultref = fixture.debugElement.queryAll(By.css('.table .custombtn'));

    expect(resultref.length).toEqual(0);

  }));


  it('when CustomBtnText has "text" then _customBtnText will be "text" as well.', () => {
    const data = 'text';
    component.CustomBtnText = data;
    expect(component._customBtnText).toEqual(data);

  });



  it('when isCustomBtn has true then _isCustomBtn will be true as well.', () => {
    const data = true;
    component.isCustomBtn = data;
    expect(component._isCustomBtn).toEqual(data);

  });


  it(`when hidecol has ['id']  then _hidecol will have same data as well.`, () => {
    const data = ['id'];
    component.hidecol = data;
    expect(component._hidecol).toEqual(data);

  });



  it('when canEdit has true value  then _canEdit will have same data as well.', () => {
    const data = true;
    component.canEdit = data;
    expect(component._canEdit).toEqual(data);

  });





  it('when canDelete has true value  then _canEdit will have same data as well.', () => {
    const data = true;
    component.canDelete = data;
    expect(component._canDelete).toEqual(data);

  });



  it('when transform is called with an json object then key will be trasform for title case if that key exists in showcol.', () => {
    const data = { id: '1', name: 'narender' };
    component.showcol = ['id'];
    expect(component.transform(data)).toEqual([{ key: 'Id', value: '1' }]);

  });

  it('when transform is called with an json object then all  key will be trasform for title case if showcol length is 0.', () => {
    const data = { id: '1', name: 'narender' };
    expect(component.transform(data)).toEqual([{ key: 'Id', value: '1' }, { key: 'Name', value: 'narender' }]);

  });


  it('When the custom_event() method is called with a string, Then the customevent  output will emit with the string', () => {

    // # GIVEN - Create a test argument and spy on the emitting output variable.
    const value = 'Test Value';
    spyOn(component.customevent, 'emit');

    // # WHEN - Call a method that will trigger the output variable to emit.
    component.custom_event(value);

    // # THEN - Assert that the output variable has emitted correctly with the test argument.
    expect(component.customevent.emit).toHaveBeenCalledWith(value);

  });




  it('When the edit() method is called with a string, Then the editing   output will emit with the string', () => {

    // # GIVEN - Create a test argument and spy on the emitting output variable.
    const value = 'Test Value';
    spyOn(component.editing, 'emit');

    // # WHEN - Call a method that will trigger the output variable to emit.
    component.edit(value);

    // # THEN - Assert that the output variable has emitted correctly with the test argument.
    expect(component.editing.emit).toHaveBeenCalledWith(value);

  });




  it('When the delete() method is called with a string (with confirm box check), Then the deleting    output will emit with the string', () => {

    // # GIVEN - Create a test argument and spy on the emitting output variable.
    const value = 'Test Value';
    spyOn(component.deleting, 'emit');

    // # WHEN - Call a method that will trigger the output variable to emit.
    spyOn(window, 'confirm').and.callFake(() => {
      return true;
    });
    component.delete(value);


    // # THEN - Assert that the output variable has emitted correctly with the test argument.
    expect(component.deleting.emit).toHaveBeenCalledWith(value);

  });


  it('When the delete() method is called with a string (with confirm box check), Then the deleting    output will emit with the string ', () => {

    // # GIVEN - Create a test argument and spy on the emitting output variable.
    const value = 'Test Value';
    spyOn(component.deleting, 'emit');

    // # WHEN - Call a method that will trigger the output variable to emit.
    spyOn(window, 'confirm').and.callFake(() => {
      return false;
    });
    component.delete(value);


    // # THEN - Assert that the output variable has emitted correctly with the test argument.
    expect(component.deleting.emit).not.toHaveBeenCalledWith(value);

  });
});
