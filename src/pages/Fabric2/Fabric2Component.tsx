import React, { useEffect, useState } from "react";
import { fabric } from "fabric-with-gestures";
import "./canvas_gestures.mixin.js";
import "./test.css";

const canvasWidth = 1300; // 캔버스 width
const canvasHeight = 650; // 캔버스 height
const clipPathWidth = 355; // 편집영역 width
const clipPathHeight = 355; // 편집영역 height
const halfSpaceWidth = (canvasWidth - clipPathWidth) / 2; // 여백공간
const halfSpaceHeight = (canvasHeight - clipPathHeight) / 2; // 여백공간

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const Fabric2Component: React.FC = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | undefined>();

  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

  const initCanvas = () => {
    const canvas: any = new fabric.Canvas("canvas", {
      width: canvasWidth,
      height: canvasHeight,
      controlsAboveOverlay: true, // clipPath 영역밖 컨트롤 표시여부
      enableRetinaScaling: false, // 레티나 디스플레이에서 이미지 크기 자동조정 제거
      backgroundColor: "#fff",
    });

    const info: any = document.getElementById("testtextarea");
    // 편집 이미지 수치가 미세하게 틀어지는 이슈로 인한 반올림 수치 조정
    // ref: https://stackoverflow.com/questions/24874670/loading-from-json-objects-not-scaled
    fabric.Object.NUM_FRACTION_DIGITS = 17;

    // canvas.on("mouse:wheel", (opt: any) => {
    //   console.log("opt", opt);
    //   var text = document.createTextNode("mouse:wheel");
    //   info.insertBefore(text, info.firstChild);
    // });
    // canvas.on("history:append", (opt: any) => {
    //   forceUpdate();
    //   console.log("opt", opt);
    //   var text = document.createTextNode(" Gesture ");
    //   info.insertBefore(text, info.firstChild);
    // });

    canvas.on("mouse:wheel", (opt: any) => {
      console.log("opt", opt);
      console.log("opt.d");
      // var text = document.createTextNode(JSON.stringify(opt));
      // // info.insertBefore(text, info.firstChild);

      // var item = document.createElement("li");
      // item.appendChild(text);
      // info.appendChild(item);
    });
    function stringifyEvent(e: any) {
      const obj: any = {};
      for (let k in e) {
        obj[k] = e[k];
      }
      return JSON.stringify(
        obj,
        (k, v) => {
          if (v instanceof Node) return "Node";
          if (v instanceof Window) return "Window";
          return v;
        },
        " "
      );
    }

    canvas.on("touch:gesture", (opt: any) => {
      const scaleSelf = opt.self.scale;
      const target = opt.target;

      if (scaleSelf && target && target.scaleX && target.scaleY) {
        target.scaleX = target.scaleX * scaleSelf;
        target.scaleY = target.scaleY * scaleSelf;
        if (target.scaleX < 0.1) {
          target.scaleX = 0.1;
          target.scaleY = 0.1;
        }
        // constrain
        if (target.scaleX > 0.5) {
          target.scaleX = 0.5;
          target.scaleY = 0.5;
        }

        // target.setCoords();
        canvas.renderAll();
        return false;
      }
    });

    const clipPath = new fabric.Rect({
      width: clipPathWidth,
      height: clipPathHeight,
      left: halfSpaceWidth,
      top: halfSpaceHeight,
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: 1,
    });

    canvas.clipPath = clipPath;

    canvas.renderAll();
    return canvas;
  };

  const imageUpload = async (e: any) => {
    const fileSrc = e.target.files[0];

    e.target.files.forEach((item: any) => {
      test(item);
    });
  };

  const test = async (fileSrc: any) => {
    getBase64(fileSrc).then((base64) => {
      try {
        const imgElement: any = document.createElement("img");
        imgElement.src = base64;
        imgElement.onload = function () {
          console.log(
            "20 / imgElement.width",
            20 / imgElement.width,
            imgElement.width
          );
          const imgInstance = new fabric.Image(imgElement, {
            angle: 0,
            opacity: 1,
            cornerSize: 10,
            borderColor: "red",
            cornerColor: "green",
            // scaleX: 360 / imgElement.width,
            // scaleY: 360 / imgElement.height,
            scaleY: clipPathHeight / imgElement.height,
          });
          imgInstance.scaleToHeight(clipPathHeight * 1.2);
          canvas!.centerObject(imgInstance); // image 캔버스 중앙으로 이동
          canvas!.add(imgInstance);
        };
      } catch (e) {
        alert(e);
        console.log("e", e);
      }
    });
  };

  const download = () => {
    const aTag = document.createElement("a");
    aTag.download = "from_canvas.png";
    aTag.href = canvas!.toDataURL({
      format: "png",
      quality: 0.8,
    });
    console.log("aTag.href", aTag.href);
    aTag.click();
  };

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);
  return (
    <>
      <input
        multiple
        type="file"
        id="imageFile"
        name="imageFile"
        onChange={imageUpload}
      />
      <div>
        <div
          style={{ position: "relative", width: "100%", minHeight: "650px" }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div>
              <canvas
                id="canvas"
                width={canvasWidth}
                height={canvasHeight}
                style={{ border: "1px solid gray" }}
              />
            </div>
          </div>
        </div>
      </div>
      <ul className="list" id="testtextarea"></ul>
      <button onClick={download}>다운로드</button>
    </>
  );
};

export default Fabric2Component;
