module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
           
        }

        // PUBLIC METHODS


        public Start(): void {
            this.name = "Player";
        }

        public Update(): void {
           this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
        }

        public Reset(): void {
           
        }

        
    }
}