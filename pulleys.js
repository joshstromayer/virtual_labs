class Pulley {
    constructor(m_1, m_2, h_1, h_2) {
        this.m_1 = m_1
        this.m_2 = m_2
        this.h_1 = h_1
        this.h_2 = h_2

        this.g = 9.81
        this.m_radius = 0.05
        this.p_radius = 0.2
        this.t = 0
        this.dt = 0.01
        this.h0 = 0

        this.calculate_circle_area = (radius) => {
            return Math.PI * (radius)**2
        }

        this.calculate_tension = () => {
            return ((2*this.m_1*this.m_2)/(this.m_1+this.m_2))*this.g
        }

        this.calculate_acceleration = () => {
            return Math.abs(this.g*((this.m_2-this.m_1)/(this.m_1+this.m_2)))
        }

        this.calculate_g_force = (m) => {
            return m*this.g
        }

        this.calulate_canvas_pos = (h) => {
            return h*20
        }

        this.calculate_height_break = () => {
            return 
        }
    }

    step(t) {
        let height = null
        let h0 = null
        this.calculate_displacement = (t) => {
            return 0.5*this.calculate_acceleration()*(t**2)
        }

        this.calculate_height_1_t_up = (t) => {
            height = 0.5*this.calculate_acceleration()*(t**2) + this.h_1
            if (height > 0) {
                height = 0.5*this.calculate_acceleration()*(t**2) + this.h_1
            } else {
                height = 0
            }
            return height
        }

        this.calculate_height_1_t_down = (t) => {
            height = this.h_1 - 0.5*this.calculate_acceleration()*(t**2)
            if (height > 0) {
                height = this.h_1 - 0.5*this.calculate_acceleration()*(t**2)
                } else {
                    height = 0
                }
                return height
        }
    
        this.calculate_height_2_t_up = (t) => {
            height = 0.5*this.calculate_acceleration()*(t**2) + this.h_2
            if (height > 0) {
                height = 0.5*this.calculate_acceleration()*(t**2) + this.h_2
                } else {
                    height = 0
                }
                return height
        }

        this.calculate_height_2_t_down = (t) => {
            height = this.h_2 - 0.5*this.calculate_acceleration()*(t**2)
            if (height > 0) {
                height = this.h_2 - 0.5*this.calculate_acceleration()*(t**2)
                } else {
                    height = 0
                }
                return height
        }

        this.calculate_height_1_t_up_canvas = (t) => {
            return this.calculate_height_1_t_up()
        }

        this.calculate_height_1_t_down_canvas = (t) => {
            return this.h_1 - 0.5*this.calculate_acceleration()*(t**2)
        }
    
        this.calculate_height_2_t_up_canvas = (t) => {
            return 0.5*this.calculate_acceleration()*(t**2) + this.h_2
        }

        this.calculate_height_2_t_down_canvas = (t) => {
            return this.h_2 - 0.5*this.calculate_acceleration()*(t**2)
        }

        this.calculate_canvas_height_1_t = () => {
            return 320-(this.calculate_height_1_t())
        }

        this.calculate_canvas_height_2_t = () => {
            return 320-(this.calculate_height_2_t())
        }

        this.calculate_height_broken_pulley_h1 = (t) => {
            h0 =(this.h_1-this.h_2)
            let s = this.h_2
            let v = Math.sqrt(2*this.calculate_acceleration()*s)
            height = h0 + v*t -0.5*this.g*(t**2)
            
            if (height>h0) {
                if (height< 1.3) {
                    height = h0 + v*t -0.5*this.g*(t**2)
                } else {
                    height = 1.3
                }
            } else {
                height = h0
            }
            return height
        }

        this.calculate_height_broken_pulley_h2 = (t) => {
            h0 =(this.h_2-this.h_1)
            let s = this.h_1
            let v = Math.sqrt(2*this.calculate_acceleration()*s)
            height = h0 + v*t -0.5*this.g*(t**2)
            
            if (height>h0) {
                if (height< 1.3) {
                    height = h0 + v*t -0.5*this.g*(t**2)
                } else {
                    height = 1.3
                }
            } else {
                height = h0
            }
            return height
        }

        this.height_broken_pulley_h1_canvas = () => {
            return this.calculate_height_broken_pulley_h1()*200
        }

        this.calculate_height_broken_h1 = (t) => {
            h0 =(this.h_1+this.h_2)
            let s = this.h_2
            let v = Math.sqrt(2*this.calculate_acceleration()*s)
            height = h0 + v*t -0.5*this.g*(t**2)
            if (height>h0) {
                if (height<1.30) {
                    height = h0 + v*t -0.5*this.g*(t**2)
                } else {
                    height = 1.30
                }
            } else {
                height = h0
            }
            return height
        }

        this.calculate_height_broken_h2 = (t) => {
            h0 =(this.h_1+this.h_2)
            let s = this.h_1
            let v = Math.sqrt(2*this.calculate_acceleration()*s)
            height = h0 + v*t -0.5*this.g*(t**2)
            if (height>h0) {
                if (height<1.30) {
                    height = h0 + v*t -0.5*this.g*(t**2)
                } else {
                    height = 1.30
                }
            } else {
                height=h0
            }
                
            return height
        }

        this.calculate_velocity_t = (t) => {
            return this.g*t
        }
    }

    draw(t, m1_up) {
        ctx03.clearRect(0, 0, 720, 360)

        ctx03.beginPath()
        ctx03.arc(360, 30, 10, 0, 2*Math.PI)
        ctx03.stroke()

        // ctx03.beginPath()
        // ctx03.moveTo(0, 290)
        // ctx03.lineTo(720, 290)
        // ctx03.stroke()

        if (m1_up === true) {
            ctx03.beginPath()
            ctx03.moveTo(355, 30)
            ctx03.lineTo(355, 300-(this.calculate_height_1_t_up(t))*200)
            ctx03.stroke()
        
            ctx03.beginPath()
            ctx03.moveTo(365, 30)
            ctx03.lineTo(365, 300-(this.calculate_height_2_t_down(t))*200)
            ctx03.stroke()
        
            ctx03.beginPath()
            ctx03.arc(355, 300-(this.calculate_height_1_t_up(t))*200, 3, 0, 2*Math.PI)
            ctx03.stroke()
        
            ctx03.beginPath()
            ctx03.arc(365, 300-(this.calculate_height_2_t_down(t))*200, 3, 0, 2*Math.PI)
            ctx03.stroke()
        } else {
            ctx03.beginPath()
            ctx03.moveTo(355, 30)
            ctx03.lineTo(355, 300-1*(this.calculate_height_1_t_down(t))*200)
            ctx03.stroke()
        
            ctx03.beginPath()
            ctx03.moveTo(365, 30)
            ctx03.lineTo(365, 300-1*(this.calculate_height_2_t_up(t))*200)
            ctx03.stroke()
        
            ctx03.beginPath()
            ctx03.arc(355, 300-1*(this.calculate_height_1_t_down(t))*200, 3, 0, 2*Math.PI)
            ctx03.stroke()
        
            ctx03.beginPath()
            ctx03.arc(365, 300-1*(this.calculate_height_2_t_up(t))*200, 3, 0, 2*Math.PI)
            ctx03.stroke()
        }
    
    }

    draw_after_break(t, t_after, m1_up, hit_floor) {
        ctx03.clearRect(0, 0, 720, 360)

        ctx03.beginPath()
        ctx03.arc(360, 30, 10, 0, 2*Math.PI)
        ctx03.stroke()

        if (m1_up===true) {
            if (hit_floor===true) {
                ctx03.beginPath()
                ctx03.moveTo(355, 30)
                ctx03.lineTo(355, 297-(this.calculate_height_broken_h1(t_after)*200))
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.moveTo(365, 30)
                ctx03.lineTo(365, 297)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.arc(355, 297-(this.calculate_height_broken_h1(t_after)*200), 3, 0, 2*Math.PI)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.arc(365, 297, 3, 0, 2*Math.PI)
                ctx03.stroke()
            } else {
                ctx03.beginPath()
                ctx03.moveTo(355, 30)
                ctx03.lineTo(355, 43)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.moveTo(365, 30)
                ctx03.lineTo(365,  300-(this.calculate_height_2_t_down(t))*200)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.arc(355, 43, 3, 0, 2*Math.PI)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.arc(365,  300-(this.calculate_height_2_t_down(t))*200, 3, 0, 2*Math.PI)
                ctx03.stroke()
            }
        } else {
            if (hit_floor===true) {    
                ctx03.beginPath()
                ctx03.moveTo(355, 30)
                ctx03.lineTo(355, 300)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.moveTo(365, 30)
                ctx03.lineTo(365, 300-(this.calculate_height_broken_h2(t_after)*200))
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.arc(355, 300, 3, 0, 2*Math.PI)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.arc(365, 300-(this.calculate_height_broken_h2(t_after)*200), 3, 0, 2*Math.PI)
                ctx03.stroke()
            } else {
                ctx03.beginPath()
                ctx03.moveTo(355, 30)
                ctx03.lineTo(355,  300-(this.calculate_height_1_t_down(t))*200)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.moveTo(365, 30)
                ctx03.lineTo(365, 43)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.arc(355,   300-(this.calculate_height_1_t_down(t))*200, 3, 0, 2*Math.PI)
                ctx03.stroke()
            
                ctx03.beginPath()
                ctx03.arc(365, 43, 3, 0, 2*Math.PI)
                ctx03.stroke()
            }
        }
    }

    draw_example(t) {
        ctx03a.clearRect(0, 0, 360, 180)

        ctx03a.beginPath()
        ctx03a.arc(180, 15, 5, 0, 2*Math.PI)
        ctx03a.stroke()
    
        ctx03a.beginPath()
        ctx03a.moveTo(350/2, 15)
        ctx03a.lineTo(350/2, this.calculate_height_1_t(t)*10)
        ctx03a.stroke()
    
        ctx03a.beginPath()
        ctx03a.moveTo(370/2, 15)
        ctx03a.lineTo(370/2, this.calculate_height_2_t(t)*10)
        ctx03a.stroke()
    
        ctx03a.beginPath()
        ctx03a.arc(350/2, this.calculate_height_1_t(t)*10, 3, 0, 2*Math.PI)
        ctx03a.stroke()
    
        ctx03a.beginPath()
        ctx03a.arc(370/2, this.calculate_height_2_t(t)*10, 3, 0, 2*Math.PI)
        ctx03a.stroke()
    }

    // MAKE COLUMNS FOR KINETIC ENERGY ETC
    produce_data(t) {
        let time = t.toFixed(1)*10
        let h1 = null
        let h2 = null

        if (this.m_1 > this.m_2) {
            this.m1_up = false
        } else {
            this.m1_up = true
        }

        if (this.m1_up === true) {
            h1 = this.calculate_height_1_t_up(t)
            h2 = this.calculate_height_2_t_down(t)
        } else {
            h1 = this.calculate_height_1_t_down(t)
            h2 = this.calculate_height_2_t_up(t)
        }

        document.getElementById("data").innerHTML = `
        <p>Tension: ${this.calculate_tension().toFixed(2)}N</p>

        `;

        if (time % 1 === 0) {
            console.log("t in data: ", time)

            let id = "pulley" + time

            document.getElementById(id).style.display='block'

            document.getElementById(id).innerHTML = `
                <td>${time/10}s</td>
                <td>${h1.toFixed(2)}m</td>
                <td>${h2.toFixed(2)}m</td>
            `;
        }

    }
}

const canvas03 = document.getElementById("myCanvas03")
let ctx03 = null

if (canvas03) {
    ctx03 = canvas03.getContext("2d");
}

const set_pulley_template = () => {
    ctx03.beginPath()
    ctx03.arc(360, 30, 10, 0, 2*Math.PI)
    ctx03.stroke()

    // ctx03.beginPath()
    // ctx03.moveTo(0, 290)
    // ctx03.lineTo(720, 290)
    // ctx03.stroke()

    ctx03.beginPath()
    ctx03.moveTo(355, 30)
    ctx03.lineTo(355, 145)
    ctx03.stroke()

    ctx03.beginPath()
    ctx03.moveTo(365, 30)
    ctx03.lineTo(365, 185)
    ctx03.stroke()

    ctx03.beginPath()
    ctx03.arc(355, 145, 3, 0, 2*Math.PI)
    ctx03.stroke()

    ctx03.beginPath()
    ctx03.arc(365, 185, 3, 0, 2*Math.PI)
    ctx03.stroke()
} 

if (canvas03) {
    set_pulley_template();
    id_pulley = setInterval(10)
}

const reset_pulley_canvas = () => {
    ctx03.clearRect(0, 0, 720, 300);
    clearInterval(id_pulley);
    set_pulley_template();
}

const pause_pulley_canvas = () => {
    clearInterval(id_pulley);
}

const broke_pulley_canvas = () => {

}

const start_pulley = document.getElementById("start_pulley")
if (start_pulley) {
    start_pulley.addEventListener("click", function(event) {
        event.preventDefault();
        reset_pulley_canvas()

        id_pulley = setInterval(increment_time, 10)

        // const mkg_1 = parseFloat(document.getElementById("m_1").value)
        // const mkg_2 = parseFloat(document.getElementById("m_2").value)
        // const hm_1 = parseFloat(document.getElementById("h_1").value)
        // const hm_2 = parseFloat(document.getElementById("h_2").value)

        const mkg_1 = 0.4
        const mkg_2 = 0.3
        const hm_1 = 0.8
        const hm_2 = 0.7

        let m_1 = mkg_1
        let h_1 = hm_1
        let m_2 = mkg_2
        let h_2 = hm_2
        let m1_up = null

        if (m_1 > m_2) {
            m1_up = false
            console.log("m1up: ", m1_up)
        } else {
            m1_up = true
            console.log("m1up: ", m1_up)
        }

        const model2 = new Pulley(m_1, m_2, h_1, h_2)

        let t = 0;
        let t_after = 0
        let hit_floor = null
        
        function increment_time() {
            t += 0.01;
        
            model2.step(t)

            let h1 = null
            let h2 = null
            if (m1_up === true) {
                h1 = model2.calculate_height_1_t_up(t)
                h2 = model2.calculate_height_2_t_down(t)
            } else {
                h1 = model2.calculate_height_1_t_down(t)
                h2 = model2.calculate_height_2_t_up(t)
            }


            let hit_pulley = null

            if (h1<=0 || h2<=0) {
                hit_floor = true
                hit_pulley = false
                clearInterval(id_pulley)
                id_pulley = setInterval(increment_time_after, 10)
            }

            if (h1>=1.285 || h2>=1.285) {
                hit_floor = false
                hit_pulley = true
                clearInterval(id_pulley)
                id_pulley = setInterval(increment_time_after, 10)
            }

            model2.draw(t, m1_up)

            document.getElementById("output").innerHTML = `
            <p>M1 Height: ${h1.toFixed(2)}m</p>
            <p>M2 Height: ${h2.toFixed(2)}m</p>
            `;
            
            model2.produce_data(t)


            return {t, hit_floor}
        }

        function increment_time_after() {
            t_after += 0.01

            model2.step(t_after)

            if (m1_up===true) {
                h2=0
                h1=model2.calculate_height_broken_h1(t_after)
            } else {
                h1=0
                h2=model2.calculate_height_broken_h2(t_after)
            }

            console.log("t_after ", t_after)
            model2.draw_after_break(t, t_after, m1_up, hit_floor)


        }
    });
}

const reset_pulley = document.getElementById("reset_pulley")
if (reset_pulley) {
    reset_pulley.addEventListener("click", function(event) {
        event.preventDefault();
        reset_pulley_canvas()

        document.getElementById("output").innerHTML = `
        <p>M1 Height: </p>
        <p>M2 Height: </p>
        `;

        document.getElementById("data").innerHTML = `
        <p>Tension: </p>
        `

        document.getElementById("table").innerHTML = `
                <table>
                <tr>
                    <th>Time</th>
                    <th>M1 Height</th>
                    <th>M2 Height</th>
                </tr>
                <tr id="pulley1">
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr id="pulley2" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley3" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley4" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley5" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley6" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley7" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley8" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley9" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley10" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley11" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley12" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley13" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley14" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley15" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                <tr id="pulley16" style="display: none;">
                    <td>M1 Height:</td>
                    <td>M2 Height:</td>
                </tr>
                </table>
        `
    });
}

const canvas03a = document.getElementById("myCanvas03a");
let ctx03a = null

if (canvas03a) {
    ctx03a = canvas03a.getContext("2d");
}

const set_pulley_template_example = () => {
    ctx03a.beginPath()
    ctx03a.arc(180, 15, 5, 0, 2*Math.PI)
    ctx03a.stroke()

    ctx03a.beginPath()
    ctx03a.moveTo(350/2, 15)
    ctx03a.lineTo(350/2, 146/2)
    ctx03a.stroke()

    ctx03a.beginPath()
    ctx03a.moveTo(370/2, 15)
    ctx03a.lineTo(370/2, 176/2)
    ctx03a.stroke()

    ctx03a.beginPath()
    ctx03a.arc(350/2, 146/2, 3, 0, 2*Math.PI)
    ctx03a.stroke()

    ctx03a.beginPath()
    ctx03a.arc(370/2, 176/2, 3, 0, 2*Math.PI)
    ctx03a.stroke()
} 

if(canvas03a) {
    set_pulley_template_example();
    id_pulley = setInterval(10);
}

const reset_pulley_canvas_example = () => {
    ctx03a.clearRect(0, 0, 360, 150);
    clearInterval(id_pulley);
    set_pulley_template_example();
}

if (canvas03a) {
    canvas03a.addEventListener("mouseenter", (event) => {
        event.preventDefault();
        reset_pulley_canvas_example()

        id_pulley = setInterval(increment_time, 10)

        const mkg_1 = 8
        const mkg_2 = 7
        const hm_1 = 7.3
        const hm_2 = 8.8

        let m_1 = null
        let m_2 = null
        let h_1 = null
        let h_2 = null

        if (mkg_1 > mkg_2) {
            m_1 = mkg_1
            h_1 = hm_1
            m_2 = mkg_2
            h_2 = hm_2
        } else {
            m_1 = mkg_2
            h_1 = hm_2
            m_2 = mkg_1
            h_2 = hm_1
        }

        const model2 = new Pulley(m_1, m_2, h_1, h_2)

        let t = 0;
        
        function increment_time() {
            t += 0.01;
        
            model2.step(t)
        
            let h1 = model2.calculate_height_1_t(t)
            let h2 = model2.calculate_height_2_t(t)

            model2.draw_example(t)

            if (h1*10<20 || h2*10<20 || h1*10>295/2 || h2*10>295/2) {
                pause_pulley_canvas()
            }
            
            return t
        }
    });
    canvas03a.addEventListener("mouseover", (event) => {
        reset_pulley_canvas_example();
    })

    canvas03a.addEventListener("click", function(event) {
        event.preventDefault();
        reset_pulley_canvas_example()

        id_pulley = setInterval(increment_time, 10)

        const mkg_1 = 8
        const mkg_2 = 7
        const hm_1 = 7.3
        const hm_2 = 8.8

        let m_1 = null
        let m_2 = null
        let h_1 = null
        let h_2 = null

        if (mkg_1 > mkg_2) {
            m_1 = mkg_1
            h_1 = hm_1
            m_2 = mkg_2
            h_2 = hm_2
        } else {
            m_1 = mkg_2
            h_1 = hm_2
            m_2 = mkg_1
            h_2 = hm_1
        }

        const model2 = new Pulley(m_1, m_2, h_1, h_2)

        let t = 0;
        
        function increment_time() {
            t += 0.01;
        
            model2.step(t)
        
            let h1 = model2.calculate_height_1_t(t)
            let h2 = model2.calculate_height_2_t(t)

            model2.draw_example(t)

            if (h1*10<20 || h2*10<20 || h1*10>295/2 || h2*10>295/2) {
                pause_pulley_canvas()
            }
            
            return t
        }
    })
}