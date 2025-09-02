class Pendulum {
    constructor(m_kg, l_cm, theta_initial) {
        this.m_kg = m_kg
        this.g_ms2 = 9.81
        this.mg = this.m_kg*this.g_ms2
        this.l_m = l_cm * 0.01
        this.theta_initial = (theta_initial*Math.PI)/180
        this.yes_or_no = true

        this.t = 0
        this.dt = 1

        this.angular_frequency = Math.sqrt(this.g_ms2/this.l_m)
        this.period = 2*Math.PI*Math.sqrt(this.l_m/this.g_ms2)
        this.frequency = 1/(2*Math.PI)*Math.sqrt(this.g_ms2/this.l_m)
        
        if (this.theta_initial !== 0) {
            this.phase_constant = 0
        } else {
            this.phase_constant = Math.PI/2
        }
        
        // this.step()
    }

    step(t) {
        this.calculate_theta_time = (t) => {
            // console.log(this.angular_frequency)
            // console.log(t)
            // console.log(this.theta_initial*Math.cos(this.angular_frequency*t + this.phase_constant))
            return this.theta_initial*Math.cos(this.angular_frequency*t + this.phase_constant)
        }

        this.sin_theta = Math.sin(this.calculate_theta_time(t))
        this.cos_theta = Math.cos(this.calculate_theta_time(t))
        this.sin_theta_small = this.calculate_theta_time(t)
        this.cos_theta_small = 1 - ((this.calculate_theta_time(t))**2 / 2)

        this.theta_velocity = Math.sqrt((2*this.g_ms2/this.l_m)*((this.cos_theta)-Math.cos(this.theta_initial)))

        // for small angle approximations
        if (this.theta_initial < 0.261799 && this.theta_initial > 0) {
            this.theta_momentum = -1*(this.g_ms2/this.l_m)*this.calculate_theta_time(t)
            this.sin_theta = this.sin_theta_small
            this.cos_theta = this.cos_theta_small
        } else {
            this.theta_momentum = this.m_kg*(this.l_m**2)*this.theta_velocity
        }

        if (this.theta_initial !== 0) {
            this.theta_max = this.theta_initial
        } else {
            this.theta_max = this.theta_velocity / this.theta_momentum
        }

        this.force_tangent = -1*this.mg*this.sin_theta
        this.torque = -1*this.m_kg*this.g_ms2*this.l_m*this.sin_theta
        this.tang_speed = this.l_m*this.theta_velocity
        
        
            this.calculate_x_position = () => {
                return this.l_m*this.sin_theta*8
            };

            this.calculate_x_position_canvas = () => {
                return (this.calculate_x_position()*100)+360
            };

            this.change_x_pos = () => {
                pass
            }
            
            this.calculate_y_position = () => { // relative to the pivot
                return (this.l_m*this.cos_theta)-this.l_m
            }

            this.calculate_y_position_canvas = () => {
                return this.calculate_y_position()*800+30+this.l_m*800
            }

            this.change_y_pos = () => {
                
            }

            this.calculate_vertical_position = () => { // vertical distance from ball to lowest point 
                return this.l_m*(1-this.cos_theta)
            }

            this.calculate_height = () => { // vertical distance from ball to base
                // return this.vert_distance + this.calculate_vertical_position()
            }
            
            this.calculate_k_energy = () => {
                return (0.5*this.m_kg*((this.tang_speed)**2))
            }

            this.calculate_p_energy = () => {
                return this.mg*(this.calculate_vertical_position())
            }

            this.calculate_total_energy = () => {
                return this.calculate_k_energy() + this.calculate_p_energy();
            }

            // const x_pos = calculate_x_position()
            // const y_pos = calculate_y_position()
            // const theta_time = calculate_theta_time(t)
            // const vert_pos = calculate_vertical_position()
            // const calc_height = calculate_height()
            // this.k_energy = this.calculate_k_energy()
            // const p_energy = calculate_p_energy()
            // const total_energy = calculate_total_energy()

            // console.log(this.calculate_x_position())
            // console.log(this.calculate_y_position())
            // console.log("theta_time: ", this.calculate_theta_time(t))
            // console.log(this.calculate_vertical_position())
            // console.log("ke: ", this.calculate_k_energy())
            // console.log("pe: ", this.calculate_p_energy())
            // console.log(this.calculate_total_energy())
        }

        draw (t) {
            ctx.clearRect(0, 0, 720, 300)
            ctx.beginPath()
            ctx.moveTo(360, 30);
            ctx.lineTo(this.calculate_x_position_canvas(), this.calculate_y_position_canvas());
            ctx.stroke()
            
            ctx.beginPath()
            ctx.arc(360, 30, 4, 0, 2*Math.PI)
            ctx.stroke()
            
            ctx.beginPath()
            ctx.arc(this.calculate_x_position_canvas(), this.calculate_y_position_canvas(), 8, 0, 2*Math.PI)
            ctx.stroke()
        }

        set_template() {
            ctx.beginPath()
            ctx.moveTo(360, 30)
            ctx.lineTo(360, 270)
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(360, 30, 4, 0, 2*Math.PI)
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(360, 270, 8, 0, 2*Math.PI)
            ctx.stroke()
        }

}

class PendulumDamping {

}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";

const set_pendulum_template = () => {
    ctx.beginPath()
    ctx.moveTo(360, 30)
    ctx.lineTo(360, 270)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(360, 30, 4, 0, 2*Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(360, 270, 8, 0, 2*Math.PI)
    ctx.stroke()
}

set_pendulum_template()

id_pendulum = setInterval(10)

document.getElementById("start_pendulum").addEventListener("click", function(event) {
    event.preventDefault();
    reset_pendulum_canvas();

    const m_kg = parseFloat(document.getElementById("mass_bob").value)
    const l_cm = parseFloat(document.getElementById("string_length").value)
    const theta_initial = parseFloat(document.getElementById("theta_initial").value)
    const damping = parseFloat(document.getElementById("damping").value)
    console.log(damping)

    // const m_kg = 13
    // const l_cm = 30
    // const theta_initial = 45
    // const damping = false

    if (damping === "true") {
        const model = new Pendulum(m_kg, l_cm, theta_initial)
        return model
    } else {
        const model = new PendulumDamping(m_kg, l_cm, theta_initial, damping)
        return model
    } 

    // const model = new Pendulum(m_kg, l_cm, theta_initial, damping) 
    
    id_pendulum = setInterval(increment_time, 10)

    let t = 0

    function increment_time() {
        t=t+0.01;
        
        model.step(t)

        // console.log("x_pos: ", model.calculate_x_position())
        // console.log("y_pos: ", model.calculate_y_position())
        // console.log("theta_time: ", model.calculate_theta_time(t))
        // console.log("vert_pos: ", model.calculate_vertical_position())
        // console.log("ke: ", model.calculate_k_energy())
        // console.log("pe: ", model.calculate_p_energy())
        // console.log("total energy: ", model.calculate_total_energy())

        model.draw(t)
    
        document.getElementById("pendulum-output").innerHTML = `
        <p>Period: ${model.period.toFixed(3)}s</p>
        <p>Kinetic Energy: ${model.calculate_k_energy().toFixed(2)}J</p>
        <p>Potential Energy: ${model.calculate_p_energy()}J</p>
        <p>Total Energy: ${model.calculate_total_energy()}J</p>
        <p>x-Position: ${model.calculate_x_position()*100}cm</p>
        <p>y-Position: ${model.calculate_y_position()*100}cm</p>
        `;
        return t;
    }

});

document.getElementById("reset_pendulum").addEventListener("click", function(event) {
    event.preventDefault();
    reset_pendulum_canvas()
});

const reset_pendulum_canvas = () => {
    clearInterval(id_pendulum)
    ctx.clearRect(0, 0, 720, 300)
    set_pendulum_template()
    document.getElementById("pendulum-output").innerHTML = `
    <p>Period: 0s</p>
    <p>Kinetic Energy: 0J</p>
    <p>Potential Energy: 0J</p>
    <p>Total Energy: 0J</p>
    <p>x-Position: 0cm</p>
    <p>y-Position: 0cm</p>
`;
}