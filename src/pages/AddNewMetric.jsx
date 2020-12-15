/* eslint-disable */
import React from 'react';
import { Tooltip, Icon } from 'antd';

export const AddNewMetric = ({ setVisibility, objectives }) => (<div className="link mb-40 col-md-6 col-lg-4 d-flex align-items-baseline mt6 pt4  pointer" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
		<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon ">
			<i className="fas fa-plus color-heading f-18 dn"></i>
		</div>
		<div className="inner flex items-start">
			<button className="link mb-20 f-14 semibold text-uppercase sp-20 title underline" type='button' onClick={() => setVisibility(true)}>+ Add</button>
			{objectives && objectives.length === 0 && <Tooltip className='o-50 mt1 ml3' title={() => <p>It's time to go have that conversation. We've drafted an email that you can send to everyone that needs to make this decision, you can use it as a starting point and tweak it as necessary.
														  <a href='#'> {' '}Check it out here.</a>
			</p>}>
				<Icon type="info-circle" />
			</Tooltip>}
		</div>
	</div>);
