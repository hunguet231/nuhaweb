import {
  CircularProgress,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import swal from "@sweetalert/with-react";
import ImageUploading from "react-images-uploading";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import editorLabels from "../../ultils/draft-wysiwyg-vi";
import readNumber from "read-vn-number";
import "./EditProduct.css";

function EditProduct({ history, match }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [prices, setPrices] = useState("");
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState(null);
  const [images, setImages] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState("");
  const [valueUpload, setValueUpload] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = "/me/update-shop";

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")).user.isSeller) {
      history.push(redirect);
    }
  }, [userInfo, history]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchProduct = async () => {
      const { data } = await Axios.get(
        `/api/v1/products?slug=${match.params.slug}`
      );
      setProduct(data.data[0]);
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setQuantity(product.quantity);
      setPrices(product.prices);
      setCategory(product.category);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(product.description)
          )
        )
      );
      initImagesPreview(product.photos);
    }
  }, [product]);

  useEffect(() => {
    if (photos && photos.length) {
      editPrd();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      swal({
        title: "Cập nhật thành công",
        content: <a href="/me/sell/products">Về trang sản phẩm</a>,
        icon: "success",
        button: "Sửa đổi tiếp",
      });
    }
  }, [photos]);

  // init images preview
  // const urlToFile = async (image) => {
  //   const response = await fetch(image);
  //   const blob = await response.blob();
  //   const file = new File([blob], `${image}.png`, { type: blob.type });
  //   return file;
  // };

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  const initImagesPreview = (photos) => {
    const imgObjList = [];
    photos.forEach((photo) => {
      // const file = urlToFile(photo);
      toDataURL(photo).then((dataUrl) => {
        imgObjList.push({ data_url: dataUrl });
      });
    });
    setImages(imgObjList);
  };

  // handle click edit button
  const handleEdit = (e) => {
    e.preventDefault();
    upload();
  };

  // upload and set photos
  const upload = async () => {
    setImgLoading(true);
    // post to cloundinary
    const url = "https://api.cloudinary.com/v1_1/dcsvjbc6c/image/upload";
    const formData = new FormData();
    let photosArray = [];

    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      formData.append("file", image.data_url);
      formData.append("upload_preset", "babuweb");

      const res = await Axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.data.secure_url;
      photosArray.push(data);
    }
    setImgLoading(false);
    setPhotos(photosArray);
  };

  // put req to edit product
  const editPrd = async () => {
    setLoading(true);

    if (product) {
      const { _id } = product;

      await Axios.put(
        `/api/v1/products/${_id}`,
        {
          title,
          description,
          quantity,
          prices,
          category,
          photos,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo")).token
            }`,
          },
        }
      );

      setLoading(false);
    }
  };

  const onImgsChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    console.log(imageList);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePriceChange = (e) => {
    const addCommas = (num) =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

    setPrices(addCommas(removeNonNumeric(e.target.value)));
  };

  return (
    <div className="edit-product">
      <div className="heading">
        <RateReviewOutlinedIcon />
        <h3>Sửa đổi sản phẩm</h3>
      </div>
      <form onSubmit={handleEdit}>
        <TextField
          variant="outlined"
          label="Tên sản phẩm"
          onChange={handleTitleChange}
          required
          InputLabelProps={{
            style: {
              fontSize: "14px",
            },
          }}
          value={title}
        />
        <TextField
          variant="outlined"
          label="Số lượng"
          onChange={handleQuantityChange}
          required
          InputLabelProps={{
            style: {
              fontSize: "14px",
            },
          }}
          value={quantity}
        />
        <TextField
          variant="outlined"
          label="Đơn giá"
          onChange={handlePriceChange}
          required
          inputProps={{ maxLength: 16 }}
          InputLabelProps={{
            style: {
              fontSize: "14px",
            },
          }}
          value={prices}
        />
        <p>
          Giá bằng chữ:{" "}
          <span className="prices-text">
            {prices
              ? `${readNumber(parseInt(prices.split(".").join("")))} đồng`
              : ""}
          </span>
        </p>

        <p>Mô tả chi tiết</p>
        <Editor
          wrapperClassName="wrapper-editor"
          editorClassName="content-editor"
          localization={{ locale: "vi", translations: editorLabels }}
          editorState={editorState}
          onEditorStateChange={(state) => {
            setEditorState(state);
            setDescription(
              draftToHtml(convertToRaw(state.getCurrentContent()))
            );
          }}
        />

        <p>Danh mục</p>
        <FormControl>
          <Select value={category} onChange={handleCategoryChange}>
            <MenuItem value={"Đồ công nghệ"}>Đồ công nghệ</MenuItem>
            <MenuItem value={"Quần áo"}>Quần áo</MenuItem>
            <MenuItem value={"Đồ ăn"}>Đồ ăn</MenuItem>
          </Select>
        </FormControl>
        <p>Ảnh sản phẩm</p>
        <ImageUploading
          value={images}
          multiple
          onChange={onImgsChange}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <div className="remove-all" onClick={onImageRemoveAll}>
                Xoá tất cả
              </div>
              <div
                className="drop-zone"
                style={isDragging ? { border: "2px dashed #74b9ff" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                <PhotoLibraryOutlinedIcon />
                Chọn ảnh hoặc kéo thả vào đây
              </div>
              <div className="preview">
                {images.map((image, index) => (
                  <div key={index} className="image-item">
                    <div className="img">
                      <img src={image.data_url} width="100" />
                      <CloseOutlinedIcon
                        className="remove"
                        onClick={() => onImageRemove(index)}
                      />
                      <EditOutlinedIcon
                        className="update"
                        onClick={() => onImageUpdate(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
        {imgLoading && (
          <>
            <p>Đang tải lên ảnh... </p>
            <LinearProgress color="secondary" style={{ marginTop: "5px" }} />
          </>
        )}

        <button type="submit">
          <SaveOutlinedIcon />
          Ghi nhận{" "}
          {loading && <CircularProgress style={{ color: "#fff" }} size={15} />}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
