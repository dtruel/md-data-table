'use strict';

angular.module('md.data.table').directive('mdHead', mdHead);

function mdHead($compile) {

  function compile(tElement) {
    tElement.addClass('md-head');
    return postLink;
  }
  
  // empty controller to be bind scope properties to
  function Controller() {
    
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    
    function attachCheckbox() {
      var children = element.children();
      
      // append an empty cell to preceding rows
      for(var i = 0; i < children.length - 1; i++) {
        children.eq(i).prepend('<th class="md-column">');
      }
      
      children.eq(children.length - 1).prepend(createCheckBox());
    }
    
    function createCheckBox() {
      var checkbox = angular.element('<md-checkbox>');
      
      checkbox.attr('aria-label', 'Select All');
      checkbox.attr('ng-click', 'toggleAll()');
      checkbox.attr('ng-checked', 'allSelected()');
      
      return angular.element('<th class="md-column">').append($compile(checkbox)(scope));
    }
    
    function every(callback) {
      for(var i = 0, rows = tableCtrl.getBody().children(); i < rows.length; i++) {
        var row = rows.eq(i);
        
        if(!row.hasClass('ng-leave') && !callback(row, row.controller('mdSelect'))) {
          return false;
        }
      }
      
      return true;
    }
    
    function forEach(callback) {
      for(var i = 0, rows = tableCtrl.getBody().children(); i < rows.length; i++) {
        var row = rows.eq(i);
        
        if(!row.hasClass('ng-leave')) {
          callback(row, row.controller('mdSelect'));
        }
      }
    }
    
    function removeCheckbox() {
      element.find('md-checkbox').parent().remove();
    }
    
    scope.allSelected = function () {
      return tableCtrl.getBody().children().length && every(function (row, ctrl) {
        return ctrl && (ctrl.disabled || ctrl.isSelected());
      });
    };
    
    scope.selectAll = function () {
      forEach(function (row, ctrl) {
        if(ctrl && !ctrl.isSelected()) {
          ctrl.select();
        }
      });
    };
    
    scope.toggleAll = function () {
      return scope.allSelected() ? scope.unSelectAll() : scope.selectAll();
    };
    
    scope.unSelectAll = function () {
      forEach(function (row, ctrl) {
        if(ctrl && ctrl.isSelected()) {
          ctrl.deselect();
        }
      });
    };
    
    scope.$watch(tableCtrl.selectionEnabled, function (enabled) {
      if(enabled) {
        attachCheckbox();
      } else {
        removeCheckbox();
      }
    });
  }
  
  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdHead',
    require: '^^mdTable',
    restrict: 'A',
    scope: {
      order: '=?mdOrder',
      onReorder: '=?mdOnReorder'
    }
  };
}

mdHead.$inject = ['$compile'];