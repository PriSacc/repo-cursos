export class DestinoViajes {
  private selected: boolean;
  public detalle: string[];

  constructor (public nombre: string, public url: string){
    this.detalle = ['Desayuno','Pileta'];
  }

  isSelected() {
    return this.selected;
  }

  setSelected(x: boolean) {
    this.selected = x;
  }
}