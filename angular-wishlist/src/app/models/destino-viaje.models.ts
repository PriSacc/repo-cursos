export class DestinoViajes {
  private selected: boolean;
  
  constructor (public nombre: string, public url: string){
  }

  isSelected() {
    return this.selected;
  }

  setSelected(x: boolean) {
    this.selected = x;
  }
}