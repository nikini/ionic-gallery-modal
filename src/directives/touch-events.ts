import { Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Gesture } from 'ionic-angular';

@Directive({
  selector: '[touch-events]'
})
export class TouchEventsDirective implements OnInit, OnDestroy {
  private gestureListener: Gesture;

  @Output() pinch = new EventEmitter();
  @Output() pinchstart = new EventEmitter();
  @Output() pinchend = new EventEmitter();
  @Output() pan = new EventEmitter();
  @Output() doubletap = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.gestureListener = new Gesture(this.el.nativeElement, {
      domEvents: false,
    });
    this.gestureListener.listen();
    this.gestureListener.on('pinch', (event) => {
      this.pinch.emit(event);
    });
    this.gestureListener.on('pinchstart', (event) => {
      this.pinchstart.emit(event);
    });
    this.gestureListener.on('pinchend', (event) => {
      this.pinchend.emit(event);
    });
    this.gestureListener.on('pan', (event) => {
      this.pan.emit(event);
    });
    this.gestureListener.on('doubletap', (event) => {
      this.doubletap.emit(event);
    });
  }

  ngOnDestroy() {
    this.gestureListener.destroy();
  }
}
