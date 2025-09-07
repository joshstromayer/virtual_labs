
const start_pulley = document.getElementById("start_pulley")
if (start_pulley) {
    start_pulley.addEventListener("click", function(event) {
        event.preventDefault();
        reset_pulley_canvas()

        const mkg_1 = parseFloat(document.getElementById("m_1").value)
        // const mkg_2 = parseFloat(document.getElementById("m_2").value)
        // const hm_1 = parseFloat(document.getElementById("h_1").value)
        // const hm_2 = parseFloat(document.getElementById("h_2").value)

        // const mkg_1 = 8
        const mkg_2 = 10
        const hm_1 = 0.6
        const hm_2 = 0.4

        let m_1 = mkg_1
        let h_1 = hm_1
        let m_2 = mkg_2
        let h_2 = hm_2
        let m1_up = null

        let = id_pulley = null
        id_pulley_after = setInterval(increment_time_after, 10)

        if (m_1 > m_2) {
            m1_up = false
            console.log("m1up: ", m1_up)
            setInterval(increment_time_m1_down, 10)
        } else {
            m1_up = true
            console.log("m1up: ", m1_up)
            setInterval(increment_time_m1_up, 10)
        }


        const model2 = new Pulley(m_1, m_2, h_1, h_2)

        let t = 0;
        let t_after = 0
        let is_slack = false
        
        if (is_slack===false) {
            if (m1_up===false) {
                function increment_time_m1_down() {

                    t += 0.01;
                
                    model2.step(t)

                    let h1 = model2.calculate_height_1_t_down(t)
                    let h2 = model2.calculate_height_2_t_up(t)

                    model2.draw(t, m1_up)

                    document.getElementById("output").innerHTML = `
                    <p>M1 Height: ${h1.toFixed(2)}m</p>
                    <p>M2 Height: ${h2.toFixed(2)}m</p>
                    `;

                    // let h1 = null
                    // let h2 = null
                    // if (model2.m_1 > model2.m_2) {
                    //     h2 = model2.calculate_height_1_t(t)
                    //     h1 = model2.calculate_height_2_t(t)
                    //     if (h2<0 || h1<0) {
                    //         t_after += 0.02
                    //         model2.step(t_after)
                    //         model2.draw_after_break(t_after)
                    //         console.log("draw_broken")
                    //         h1 = model2.calculate_height_2_t(t_after)
                    //         h2=0
                    //     } else {
                    //         model2.draw(t, m1_up)
                    //     }
                    // } else {
                    //     model2.draw(t, m1_up)
                    //     // this part is absolutely insane bro remember that -- ibr maybe you shouldnt even do this part its not that serious 
                    //     // (h_1 < (13.5-h_2))
                    // }


                    return t
                }
            }

            if (m1_up===true) {
                function increment_time_m1_up() {

                    t += 0.01;
                
                    model2.step(t)

                    let h1 = model2.calculate_height_1_t_up(t)
                    let h2 = model2.calculate_height_2_t_down(t)

                    model2.draw(t, m1_up)

                    document.getElementById("output").innerHTML = `
                    <p>M1 Height: ${h1.toFixed(2)}m</p>
                    <p>M2 Height: ${h2.toFixed(2)}m</p>
                    `;

                    // let h1 = null
                    // let h2 = null
                    // if (model2.m_1 > model2.m_2) {
                    //     h2 = model2.calculate_height_1_t(t)
                    //     h1 = model2.calculate_height_2_t(t)
                    //     if (h2<0 || h1<0) {
                    //         t_after += 0.02
                    //         model2.step(t_after)
                    //         model2.draw_after_break(t_after)
                    //         console.log("draw_broken")
                    //         h1 = model2.calculate_height_2_t(t_after)
                    //         h2=0
                    //     } else {
                    //         model2.draw(t, m1_up)
                    //     }
                    // } else {
                    //     model2.draw(t, m1_up)
                    //     // this part is absolutely insane bro remember that -- ibr maybe you shouldnt even do this part its not that serious 
                    //     // (h_1 < (13.5-h_2))
                    // }


                    return t
                }
            }
        }

        if (m1_up===true) {
            if (this.calculate_height_2_t_down(t)===0) {
                is_slack=true
            }
        } else {
            if (this.calculate_height_1_t_down(t)===0) {
                is_slack=true
            }
        }

        if (is_slack===true) {
            function increment_time_after() {
                t_after += 0.01

                model2.step(t_after)

                model2.draw_after_break(t_after)

                // find out which (h1 or h2) is on the ground

                document.getElementById("output").innerHTML = `
                <p>M1 Height: ${h1.toFixed(2)}m</p>
                <p>M2 Height: ${h2.toFixed(2)}m</p>
                `;

                return t_after
            }
        }
    });
}



// the one that last worked 
// const start_pulley = document.getElementById("start_pulley")
// if (start_pulley) {
//     start_pulley.addEventListener("click", function(event) {
//         event.preventDefault();
//         reset_pulley_canvas()

//         id_pulley = setInterval(increment_time, 10)

//         const mkg_1 = parseFloat(document.getElementById("m_1").value)
//         // const mkg_2 = parseFloat(document.getElementById("m_2").value)
//         // const hm_1 = parseFloat(document.getElementById("h_1").value)
//         // const hm_2 = parseFloat(document.getElementById("h_2").value)

//         // const mkg_1 = 8
//         const mkg_2 = 10
//         const hm_1 = 0.6
//         const hm_2 = 0.4

//         let m_1 = mkg_1
//         let h_1 = hm_1
//         let m_2 = mkg_2
//         let h_2 = hm_2
//         let m1_up = null

//         if (m_1 > m_2) {
//             m1_up = false
//             console.log("m1up: ", m1_up)
//         } else {
//             m1_up = true
//             console.log("m1up: ", m1_up)
//         }

//         const model2 = new Pulley(m_1, m_2, h_1, h_2)

//         let t = 0;
//         let t_after = 0
        
//         function increment_time() {

//             t += 0.01;
        
//             model2.step(t)

//             let h1 = null
//             let h2 = null
//             if (m1_up === true) {
//                 h1 = model2.calculate_height_1_t_up(t)
//                 h2 = model2.calculate_height_2_t_down(t)
//             } else {
//                 h1 = model2.calculate_height_1_t_down(t)
//                 h2 = model2.calculate_height_2_t_up(t)
//             }

//             model2.draw(t, m1_up)

//             document.getElementById("output").innerHTML = `
//             <p>M1 Height: ${h1.toFixed(2)}m</p>
//             <p>M2 Height: ${h2.toFixed(2)}m</p>
//             `;

//             // let h1 = null
//             // let h2 = null
//             // if (model2.m_1 > model2.m_2) {
//             //     h2 = model2.calculate_height_1_t(t)
//             //     h1 = model2.calculate_height_2_t(t)
//             //     if (h2<0 || h1<0) {
//             //         t_after += 0.02
//             //         model2.step(t_after)
//             //         model2.draw_after_break(t_after)
//             //         console.log("draw_broken")
//             //         h1 = model2.calculate_height_2_t(t_after)
//             //         h2=0
//             //     } else {
//             //         model2.draw(t, m1_up)
//             //     }
//             // } else {
//             //     model2.draw(t, m1_up)
//             //     // this part is absolutely insane bro remember that -- ibr maybe you shouldnt even do this part its not that serious 
//             //     // (h_1 < (13.5-h_2))
//             // }


//             return t
//         }
//     });
// }