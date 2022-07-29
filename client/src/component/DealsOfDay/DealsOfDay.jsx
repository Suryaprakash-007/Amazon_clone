import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const DealsOfDay = ({ productArr, title, tagLine }) => {
  return (
    <div>
      <h6 className="title_deals" style={{ margin: "1em 0.5em" }}>
        {title}
      </h6>
      <div className="dealsOfDay">
        {productArr?.map((item, i) => {
          return (
            <ProductCard
              key={i}
              name={item.name}
              imgUrl={item.imgUrl}
              offer={item.offer}
              price={item.price}
              tagLine={tagLine}
              id={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DealsOfDay;
