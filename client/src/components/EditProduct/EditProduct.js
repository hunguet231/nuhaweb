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
import { EditorState, convertToRaw } from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
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
  const [editorSate, setEditorState] = useState(EditorState.createEmpty());

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = "/me/update-shop";

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")).user.isSeller) {
      history.push(redirect);
    }
  }, [userInfo, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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
    }
  }, [product]);

  useEffect(() => {
    if (photos && photos.length) {
      editPrd();
      window.scrollTo(0, 0);
      swal({
        title: "Cập nhật thành công",
        content: <a href="/me/sell/products">Về trang sản phẩm</a>,
        icon: "success",
        button: "Sửa đổi tiếp",
      });
    }
  }, [photos]);

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
    setPrices(e.target.value);
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
          value={title}
        />
        <p>Mô tả chi tiết*</p>
        {/* <Editor
          editorState={description}
          onEditorStateChange={(state) => {
            setEditorState(state);
          }}
        /> */}
        {/* <CKEditor
          editor={ClassicEditor}
          config={{
            removePlugins: ["MediaEmbed", "ImageUpload"],
            language: "vi",
          }}
          data={description}
          onChange={(event, editor) => {
            setDescription(editor.getData());
          }}
        />
        <TextField
          variant="outlined"
          label="Số lượng"
          onChange={handleQuantityChange}
          value={quantity}
        /> */}
        <TextField
          variant="outlined"
          label="Đơn giá"
          onChange={handlePriceChange}
          value={prices}
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
          multiple
          value={images}
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
                {imageList.map((image, index) => (
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
