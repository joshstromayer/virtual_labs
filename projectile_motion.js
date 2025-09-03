class ProjectileMotion {
    constructor(initial_velocity, theta) {
        this.initial_velocity = initial_velocity;
        this.theta = theta;
        this.vi_x = Math.cos(this.theta)*this.initial_velocity;
        this.vi_y = Math.sin(this.theta)*this.initial_velocity;
        this.g = 9.81
        this.t = 0
        this.dt = 1
    }

    step(t) {
        let x_pos = 0

        this.calculate_x_position = () => {
            const x_pos = this.initial_velocity*Math.cos(this.theta)*t
            if (this.calculate_y_position() > 0) return x_pos
            else return this.range()
        }

        this.calculate_y_position = () => {
            const height = this.initial_velocity*Math.sin(this.theta)*t-0.5*9.81*t**2
            if (height > 0 && (x_pos*2.5+20) < 680) {return height}
            else return 0
        }

        this.calculate_y_position_example = () => {
            const height = this.initial_velocity*Math.sin(this.theta)*t-0.5*9.81*t**2
            if (height > 0 && (x_pos*1.25+10) < 340) {return height}
            else return 0
        }
        
        this.calculate_x_position_canvas = () => {
            return this.calculate_x_position()*2.5+20
        }

        this.calculate_x_position_canvas_example = () => {
            return this.calculate_x_position()*1.25+10
        }

        this.calculate_y_position_canvas = () => {
            return 280-(this.calculate_y_position()*2.5)-4
        }

        this.calculate_y_position_canvas_example = () => {
            return 140-(this.calculate_y_position_example()*1.25)-2
        }

        this.calculate_vel_x = () => {
            
        }

        this.calculate_vel_y = () => {

        }
    }   

    time_of_flight() {
        const time_of_flight = 2 * this.vi_y / this.g;
        return (time_of_flight);
    }

    range() {
        const horizontal_distance = (Math.sin(2*this.theta) * this.initial_velocity**2) / this.g;
        return (horizontal_distance);
    }

    max_height() {
        const max_height = (this.initial_velocity**2 * (Math.sin(this.theta))**2) / (2*this.g);
        return (max_height);
    }

    draw() {
        ctx01.clearRect(0, 0, 720, 300)

        ctx01.beginPath()
        ctx01.moveTo(20, 280)
        ctx01.lineTo(700, 280)
        ctx01.stroke()
        
        ctx01.beginPath()
        ctx01.arc(this.calculate_x_position_canvas(), this.calculate_y_position_canvas(), 4, 0, 2*Math.PI)
        ctx01.stroke()
    }

    draw_example() {
        ctx01a.clearRect(0, 0, 360, 150)

        ctx01a.beginPath()
        ctx01a.moveTo(10, 140)
        ctx01a.lineTo(350, 140)
        ctx01a.stroke()
        
        ctx01a.beginPath()
        ctx01a.arc(this.calculate_x_position_canvas_example(), this.calculate_y_position_canvas_example(), 2, 0, 2*Math.PI)
        console.log(this.calculate_x_position_canvas_example(), this.calculate_y_position_canvas_example())
        ctx01a.stroke()
    }

}

const canvas01 = document.getElementById("myCanvas01");
let ctx01 = null

if (canvas01) {
    ctx01 = canvas01.getContext("2d");
}


const set_proj_template = () => {
    ctx01.beginPath()
    ctx01.moveTo(20, 280)
    ctx01.lineTo(700, 280)
    ctx01.stroke()

    ctx01.beginPath()
    ctx01.arc(24, 276, 4, 0, 2*Math.PI)
    ctx01.stroke()
}

if(canvas01){
    set_proj_template()
    id_proj_mot = setInterval(10)
}

const reset_proj_mot_canvas = () => {
    ctx01.clearRect(0, 0, 720, 300)
    clearInterval(id_proj_mot)
    set_proj_template()
}

const start_proj_mot = document.getElementById("start_proj_mot")
if (start_proj_mot) {
    start_proj_mot.addEventListener("click", function(event) {
        event.preventDefault();
        reset_proj_mot_canvas()

        id_proj_mot = setInterval(increment_time, 10)

        const velocity = parseFloat(document.getElementById("initial_velocity").value)
        const angleDegrees = parseFloat(document.getElementById("theta").value)
        const angleRadians = angleDegrees * Math.PI / 180

        const model1 = new ProjectileMotion(velocity, angleRadians)

        let t = 0


        function increment_time() {
            t=t+0.01;
            console.log(t)

            model1.step(t)

            const T = model1.time_of_flight()
            const R = model1.range()
            const MH = model1.max_height()
            const x_pos = model1.calculate_x_position()
            const height = model1.calculate_y_position()

            model1.draw(t)
        
            document.getElementById("output").innerHTML = `
            <p>x Position : ${x_pos.toFixed(2)}m</p>
            <p>Height : ${height.toFixed(2)}m</p>
            <p>Time of flight: ${T.toFixed(2)}s</p>
            <p>Horizontal Distance Travelled: ${R.toFixed(2)}m</p>
            <p>Maximum Height Reached: ${MH.toFixed(2)}m</p>
            `;

            if(height===0) {
                clearInterval(id_proj_mot)
            }
            
            return t;
        }


    });
}

const reset_proj_mot = document.getElementById("reset_proj_mot")
if (reset_proj_mot) {
    reset_proj_mot.addEventListener("click", function(event) {
        event.preventDefault();
        reset_proj_mot_canvas()

        document.getElementById("output").innerHTML = `
        <p>x Position: 0m</p>
        <p>Height: 0m</p>
        <p>Time of flight: 0s</p>
        <p>Horizontal Distance Travelled: 0m</p>
        <p>Maximum Height Reached: 0m</p>
        `;
    });
}

// for main page example canvas

const canvas01a = document.getElementById("myCanvas01a");
let ctx01a = null

if (canvas01a) {
    ctx01a = canvas01a.getContext("2d");
}

const set_proj_template_example = () => {
    ctx01a.beginPath()
    ctx01a.moveTo(10, 140)
    ctx01a.lineTo(350, 140)
    ctx01a.stroke()

    ctx01a.beginPath()
    ctx01a.arc(12, 138, 2, 0, 2*Math.PI)
    ctx01a.stroke()
}

if(canvas01a) {
    set_proj_template_example();
    id_proj_mot = setInterval(10);
}

const reset_proj_mot_canvas_example = () => {
    ctx01a.clearRect(0, 0, 360, 150)
    clearInterval(id_proj_mot)
    set_proj_template_example()
}

if (canvas01a) {
    canvas01a.addEventListener("mouseenter", (event) => {
        event.preventDefault();
        reset_proj_mot_canvas_example()

        id_proj_mot = setInterval(increment_time, 10)

        const velocity = 45
        const angleDegrees = 45
        const angleRadians = angleDegrees * Math.PI / 180

        const model1 = new ProjectileMotion(velocity, angleRadians)

        let t = 0


        function increment_time() {
            t=t+0.01;

            model1.step(t)

            const T = model1.time_of_flight()
            const R = model1.range()
            const MH = model1.max_height()
            const x_pos = model1.calculate_x_position()
            const y_pos = model1.calculate_y_position_canvas_example()

            model1.draw_example(t)

            if(y_pos===138) {
                clearInterval(id_proj_mot)
            }
                return t;
            
        }
    })
    start_proj_mot_example.addEventListener("mouseover", (event) => {
        reset_proj_mot_canvas_example();
    })
}

