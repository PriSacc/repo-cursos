export class DestinoViajes {

  private selected: boolean;
  public detalle: string[];
  public vote: number;
  
  constructor (public nombre: string, public url: string){
    this.detalle = ['Desayuno','Pileta'];
    this.vote = 0;
  }
  
  isSelected() {
    return this.selected;
  }
  
  setSelected(x: boolean) {
    this.selected = x;
  }

  voteUp() {
    this.vote++;
  }

  voteDown() {
    this.vote--;;
  }
}