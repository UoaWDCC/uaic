import React from 'react';

const Event = (props: { event: any; }) => {
    const event = props.event;

    return(
        <div className="bg-[#EBF7FE]">
          <h1 className="
          p-[20px]

          lg:p-[23px]
          ">
            <span className="
            block text-[18px] font-bold

            lg:text-[22px]
            ">
              {event.title}
            </span>
            <span className="
              block mt-[11px] text-[16px]
              
              lg:mt-[14px] lg:text-[20px]
            ">
              {event.date}
            </span>
          </h1>
        </div>
    )
}

export default Event;