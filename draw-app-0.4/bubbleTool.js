function bubbleTool(){
    this.name = "bubbleTool";
    this.icon = "assets/bubbles.jpg";

    this.points = 13;
    this.spread = random(10,20);

    this.draw = function(){
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if(mouseIsPressed){
            noFill();

            // for(var i = 0; i < this.points-12; i++){
                // point(random(mouseX-this.spread, mouseX + this.spread), 
                //     random(mouseY-this.spread, mouseY+this.spread));
                circle(random(mouseX-this.spread, mouseX + this.spread), 
                    random(mouseY-this.spread, mouseY+this.spread), this.points);
            // }

            if(mirrorEnabled){
                mirror.draw(() => {
                    // for(var i = 0; i < this.points; i++){
                        circle(random(mouseX-this.spread, mouseX + this.spread), 
                            random(mouseY-this.spread, mouseY+this.spread), this.points);
                    // }
                });
            }
        }
    }
};