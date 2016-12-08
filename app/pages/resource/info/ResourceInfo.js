import capitalize from 'lodash/capitalize';
import React, { PropTypes } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Label from 'react-bootstrap/lib/Label';
import Row from 'react-bootstrap/lib/Row';
import FontAwesome from 'react-fontawesome';

import FavoriteButton from 'shared/favorite-button';
import ImageCarousel from 'shared/image-carousel';
import WrappedText from 'shared/wrapped-text';

ResourceInfo.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  resource: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
};

function renderHeader(unit, resource) {
  const streetAddress = unit.streetAddress ? unit.streetAddress.fi : '';
  const zip = unit.addressZip;
  const city = capitalize(unit.municipality);
  const address = `${streetAddress}, ${zip} ${city}`;
  return (
    <header>
      <h2 className="unit-name">{unit.name.fi}</h2>
      <h1 className="resource-name">{resource.name.fi}</h1>
      <h4 className="unit-address">
        <FontAwesome name="map-marker" className="map-marker" /> {address}
      </h4>
    </header>
  );
}


function ResourceInfo({ isLoggedIn, resource, unit }) {
  return (
    <div className="resource-info">
      { isLoggedIn ?
        <Row>
          <Col xs={12} sm={8} md={9}>
            {renderHeader(unit, resource)}
          </Col>
          <Col xs={12} sm={4} md={3}>
            <FavoriteButton resource={resource} />
          </Col>
        </Row> :
        renderHeader(unit, resource)
      }
      <section className="resource-details">
        <Row>
          <Col xs={12} sm={7}>
            <ImageCarousel images={resource.images} />
          </Col>
          <Col xs={12} sm={5}>
            <aside>
              {resource.type && resource.type.name &&
                <h3 className="resource-type">{resource.type.name.fi}</h3>
              }
              <div className="details-row resource-people-capacity">
                <span className="details-label">Henkilömäärä: </span>
                <span className="details-value">{resource.peopleCapacity}</span>
              </div>
              {resource.equipment &&
                <div className="details-row resource-equipment">
                  <div className="details-label">Varustelu: </div>
                  {
                    resource.equipment.map(item =>
                      <Label bsStyle="primary" key={`label-${item.id}`}>{item.name.fi}</Label>
                    )
                  }
                </div>
              }
              <div className="resource-description">
                {resource.description &&
                  <WrappedText text={resource.description.fi} />
                }
              </div>
            </aside>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default ResourceInfo;
