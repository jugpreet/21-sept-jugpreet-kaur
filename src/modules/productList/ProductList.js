import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Context } from "../../store/Context";
import Sorter from "../../components/sorter/Sorter";
import Filters from "../../components/filter/Filter";
import "./ProductList.scss";
import { images } from "../../store/images"
export default function ProductList() {
  const [state, dispatch] = useContext(Context);
  const [drawer, setDrawer] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isBottom) {
      dispatch({ type: "GET_CARS" });
      setIsBottom(false);
    }
  }, [isBottom, dispatch]);

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 10 >= scrollHeight) {
      setIsBottom(true);
    }
  };

  const onFilterClick = () => {
    setDrawer(!drawer);
  };

  const addCarToCart = (car) => {
    dispatch({ type: "BOOK_NOW", payload: car });
  };

  return (
    <div className="product-list">
      <div className="container">
        <Row>
          <Col
            xs="12"
            sm="12"
            md="12"
            lg="4"
            xl="4"
            className={`product-list-left ${drawer ? "open" : ""}`}
          >
            <Filters onCloseClick={onFilterClick} />
          </Col>
          <Col
            xs="12"
            sm="12"
            md="12"
            lg="8"
            xl="8"
            className="product-list-right"
          >
            <div className="sorter-row">
              <Sorter onFilterClick={onFilterClick} />
            </div>
            <div className="product-row" >
              <Container>

                {state.cars.length ?
                  <Row>
                    {state.cars.map((car, i) => {
                      if (car.category === "Hatchback") {
                        return (
                          <Col
                            xs="12"
                            sm="6"
                            md="4"
                            lg="4"
                            xl="4"
                            key={i}
                            className="card-col"
                          >
                            <Card>
                              <div className="cat">
                                <h5>*</h5>
                              </div>
                              <CardImg
                                top
                                width="100%"
                                src={car.image}
                                alt="Card image cap"
                              />
                              <CardBody>
                                <CardTitle tag="h5">{car.title + " "}</CardTitle>
                                <CardSubtitle
                                  tag="h6"
                                  className="mb-2 text-muted"
                                >
                                  {`??? ${car.price}`}
                                </CardSubtitle>
                                <Button onClick={() => addCarToCart(car)}>
                                  Book Now
                              </Button>
                              </CardBody>
                            </Card>
                          </Col>
                        );
                      } else if (car.category === "Premium hatchback") {
                        return (
                          <Col
                            xs="12"
                            sm="6"
                            md="4"
                            lg="4"
                            xl="4"
                            key={i}
                            className="card-col"
                          >
                            <Card>
                              <div className="cat">
                                <h5>$</h5>
                              </div>
                              <CardImg
                                top
                                width="100%"
                                src={car.image}
                                alt="Card image cap"
                              />
                              <CardBody>
                                <CardTitle tag="h5">{car.title + " "}</CardTitle>
                                <CardSubtitle
                                  tag="h6"
                                  className="mb-2 text-muted"
                                >
                                  {`??? ${car.price}`}
                                </CardSubtitle>
                                <Button onClick={() => addCarToCart(car)}>
                                  Book Now
                              </Button>
                              </CardBody>
                            </Card>
                          </Col>
                        );
                      } else {
                        return (
                          <Col
                            xs="12"
                            sm="6"
                            md="4"
                            lg="4"
                            xl="4"
                            key={i}
                            className="card-col"
                          >
                            <Card>
                              <div className="cat">
                                <h5>#</h5>
                              </div>
                              <CardImg
                                top
                                width="100%"
                                src={car.image}
                                alt="Card image cap"
                              />
                              <CardBody>
                                <CardTitle tag="h5">{car.title + " "}</CardTitle>
                                <CardSubtitle
                                  tag="h6"
                                  className="mb-2 text-muted"
                                >
                                  {`??? ${car.price}`}
                                </CardSubtitle>
                                <Button onClick={() => addCarToCart(car)}>
                                  Book Now
                              </Button>
                              </CardBody>
                            </Card>
                          </Col>
                        );
                      }
                    })}
                  </Row> : <img className="noData" src={images.no_data} alt="No Data Available" />}
              </Container>
            </div>
          </Col>
        </Row>

      </div>
    </div>
  );
}
