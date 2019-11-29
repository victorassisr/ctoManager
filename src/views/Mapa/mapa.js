/*eslint-disable*/
import React from "react";
// @material-ui/core components
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";

export default function mapeamento() {
  const classes = (styles);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="info">
            <h4 className={classes.cardTitleWhite}>mapeamento de Caixas</h4>
            <p className={classes.cardCategoryWhite}>
              Para acessar o conteúdo do projeto acesse{" "}
              <a
                href="https://github.com/victorassisr/ctoManager"
                target="_blank"
              ><b>
                GitHub
              </b>
              </a>
            </p>
          </CardHeader>
          <CardBody>
            <Hidden only={["sm", "xs"]}>
              <iframe
                className={classes.iframe}
                src="http://localhost/mapas/mapa/mapa.html"
                width="990" 
                height="450"
                title="Mapeamento iframe"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Hidden>
            <Hidden only={["lg", "md"]}>
              <GridItem xs={12} sm={12} md={6}>
                {/*<h5>
                  The icons are visible on Desktop mode inside an iframe. Since
                  the iframe is not working on Mobile and Tablets please visit
                  the icons on their original page on Google. Check the
                  <a
                    href="https://design.google.com/icons/?ref=creativetime"
                    target="_blank"
                  >
                    Material Icons
                  </a>
                </h5>*/}
              </GridItem>
            </Hidden>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
