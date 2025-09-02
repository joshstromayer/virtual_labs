class Pendulum {
    constructor(m_kg, l_cm, theta_initial, simulation_length) {
        this.m_kg = m_kg
        this.g_ms2 = 9.81
        this.mg = this.m_kg*this.g_ms2
        this.l_m = l_cm * 0.01
        this.theta_initial = (theta_initial*Math.PI)/180
        this.simulation_length = simulation_length
        this.yes_or_no = true

        this.t = 0
        this.dt = 1

        // this.set_timer()

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

    set_timer() {
        setInterval(() => {
            this.t += this.dt
        }, this.dt*1000);
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
                return this.l_m*this.sin_theta
            };
            
            this.calculate_y_position = () => { // relative to the pivot
                return -1*this.l_m*this.cos_theta
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
            console.log("ke: ", this.calculate_k_energy())
            console.log("pe: ", this.calculate_p_energy())
            // console.log(this.calculate_total_energy())
        }

}

const model = new Pendulum(10, 30, 10, 10)

let t = 0

setInterval(increment_time, 100)

function increment_time() {
    t=t+0.1;
    model.step(t)

    return t;
}

if (t===model.simulation_length) {
    clearInterval
}
