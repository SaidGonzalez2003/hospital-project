import React from 'react'
import { useState } from "react";
import '../../css/controlPage.css'

const ControlPageOne = () => {

    const [controlOpc, setControlOpc] = useState(0)

    return (
        <div className='control_page_one'>

            <div className='page_one_options'>
                <div className='control_options_container'>
                    <ul className='contrel_options_nav'>
                        <li className={(controlOpc == 0 && 'control_opc_select')} onClick={() => setControlOpc(0)}>HIVAgPos</li>
                        <li className={(controlOpc == 1 && 'control_opc_select')} onClick={() => setControlOpc(1)}>HIVAbNeg</li>
                        <li className={(controlOpc == 2 && 'control_opc_select')} onClick={() => setControlOpc(2)}>HIVAbPos</li>
                        <li className={(controlOpc == 3 && 'control_opc_select')} onClick={() => setControlOpc(3)}>CHAGASPos</li>
                        <li className={(controlOpc == 4 && 'control_opc_select')} onClick={() => setControlOpc(4)}>CHAGASNeg</li>
                        <li className={(controlOpc == 5 && 'control_opc_select')} onClick={() => setControlOpc(5)}>HbAgNeg</li>
                        <li className={(controlOpc == 6 && 'control_opc_select')} onClick={() => setControlOpc(6)}>HbAgPos</li>
                        <li className={(controlOpc == 7 && 'control_opc_select')} onClick={() => setControlOpc(7)}>TrePos (2)</li>
                        <li className={(controlOpc == 8 && 'control_opc_select')} onClick={() => setControlOpc(8)}>TrepNeg (2)</li>
                        <li className={(controlOpc == 9 && 'control_opc_select')} onClick={() => setControlOpc(9)}>HCVAbNeg</li>
                        <li className={(controlOpc == 10 && 'control_opc_select')} onClick={() => setControlOpc(10)}>HCVAbPos</li>
                        <li className={(controlOpc == 11 && 'control_opc_select')} onClick={() => setControlOpc(11)}>TrePos</li>
                        <li className={(controlOpc == 12 && 'control_opc_select')} onClick={() => setControlOpc(12)}>TrepNeg</li>
                    </ul>
                </div>
            </div>

            <div className='control_data_metricas'>

                <article className='metricas_data'>

                    <div className='metricas_data_text'>
                        <div className='metricas_data_img'>
                            <img src="../src/media.png" alt="" />
                        </div>
                        <p>Media</p>

                    </div>

                    <p>0.25846</p>
                </article>

                <article className='metricas_data'>

                    <div className='metricas_data_text'>
                        <div className='metricas_data_img'>
                            <img src="../src/media.png" alt="" />
                        </div>
                        <p>Desviación</p>

                    </div>

                    <p>0.25846</p>
                </article>

                <article className='metricas_data'>

                    <div className='metricas_data_text'>
                        <div className='metricas_data_img'>
                            <img src="../src/media.png" alt="" />
                        </div>
                        <p>CV</p>

                    </div>

                    <p>0.25846</p>
                </article>

            </div>

        </div>
    )
}

export default ControlPageOne