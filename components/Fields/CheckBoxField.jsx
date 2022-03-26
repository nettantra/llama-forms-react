import { useEffect, useState } from "react";

export default function CheckBoxField(props) {
  const { properties, handleData, name } = props;
  const [style, setStyle] = useState(properties.style || {});
  const [chechBoxData, setCheckBoxData] = useState({});

  const handleChange = (e) => {
    setCheckBoxData({ ...chechBoxData, [e.target.value]: e.target.checked });
    handleData({ ...chechBoxData, [e.target.value]: e.target.checked });
  };

  useEffect(() => {
    setCheckBoxData(props.parentState[name].value);
  }, []);

  return (
    <>
      <div>
        <h3
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "400",
            fontSize: "16px",
            margin: "5px 0",
          }}
        >
          {properties["label"]}
        </h3>
        {properties["values"] &&
          properties["values"].map((item, index) => {
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id={item}
                  value={item}
                  onChange={handleChange}
                  style={style}
                  checked={chechBoxData[item] || false}
                />
                <label
                  htmlFor={item}
                  style={{
                    fontFamily: "Nunito Sans",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginLeft: "7px",
                  }}
                >
                  {item}
                </label>
              </div>
            );
          })}
        <p
          style={{
            margin: "5px 0px",
            fontFamily: "Nunito Sans",
            fontWeight: "200",
            fontSize: "14px",
          }}
        >
          {properties["description"]}
        </p>
      </div>

      <style jsx>{`
        input[type="checkbox"]:checked + label {
          color: #777;
          transition: all 0.2s ease;
          cursor:pointer;
        }
      `}</style>
    </>
  );
}
