export class DestinoViajes {

  private selected: boolean;
  public detalle: string[];
  public vote: number;
  public id: number[];
  
  constructor (public nombre: string, public url: string){
    this.detalle = ['Desayuno','Pileta'];
    this.id = [1,2,3]
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