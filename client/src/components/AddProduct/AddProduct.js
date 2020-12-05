import {
  CircularProgress,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import Alert from "@material-ui/lab/Alert";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductCreate } from "../../actions/productActions";
import swal from "@sweetalert/with-react";
import ImageUploading from "react-images-uploading";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import editorLabels from "../../ultils/draft-wysiwyg-vi";
import readNumber from "read-vn-number";
import "./AddProduct.css";

function AddProduct({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [prices, setPrices] = useState("");
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState(null);
  const [images, setImages] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let photosArray = [];

  const redirect = "/me/update-shop";

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")).user.isSeller) {
      history.push(redirect);
    }

    if (photos && images.length == photos.length && !error) {
      dispatch(
        listProductCreate(
          title,
          description,
          quantity,
          prices,
          category,
          photos
        )
      );

      setTitle("");
      setDescription("");
      setQuantity("");
      setPrices("");
      setCategory("");

      window.scrollTo(0, 0);

      // show sweetalert
      swal({
        title: "Đã thêm sản phẩm",
        content: <a href="/me/sell/products">Về trang sản phẩm</a>,
        icon: "success",
        button: "Thêm tiếp",
      });
    }
  }, [photos, userInfo, history]);

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
    const addCommas = (num) =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

    setPrices(addCommas(removeNonNumeric(e.target.value)));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    //FILE UPLOAD
    if (!error) {
      const upload = async () => {
        setImgLoading(true);
        // post to cloundinary
        const url = "https://api.cloudinary.com/v1_1/dcsvjbc6c/image/upload";
        const formData = new FormData();

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
      upload();
    }
  };

  return (
    <div className="add-product">
      <div className="heading">
        <NoteAddOutlinedIcon />
        <h3>Thêm sản phẩm</h3>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleAdd}>
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
          onEditorStateChange={(state) => {
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
                Xoá tất cả ảnh
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
          Tạo mới{" "}
          {loading && <CircularProgress style={{ color: "#fff" }} size={15} />}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
