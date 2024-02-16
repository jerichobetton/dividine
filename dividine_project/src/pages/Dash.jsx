import React from 'react';
import DashForm from '../components/DashForm'; 

function Dash() {
  return (
    <div className="app-content">
      <div className="avatar">
  <div className="w-24">
    <img src="https://plus.unsplash.com/premium_photo-1661478265448-1dc9b0eaf5d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHJlc3RhdXJhbnQlMjBiaWxsfGVufDB8fDB8fHww" alt="check" className="check"/>
  </div>
</div>
      <h2>Let us DiviDine your bill!</h2>
      <DashForm /> 
    </div>
  );
}

export default Dash;
