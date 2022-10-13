import {
  Frame,
  TopBar,
} from "@shopify/polaris";
import { connect } from "react-redux";
import { validate } from "../Redux/Action";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
function Userpage(props) {
 
  
  const userMenuMarkup = (
    <TopBar.UserMenu
      name={props.data.sellerName}
      detail={props.data.username}
      initials={props.data.sellerName.charAt(0)}
      actions={[
        {
          items: [{ content: "Back to Shopify", icon: ArrowLeftMinor }],
        },
        {
          items: [{ content: "Community forums" }],
        },
      ]}
    />
  );

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;
  console.log(props.data);
  return (
    <div>
       <div style={{height: '70px'}}>
        <Frame topBar={topBarMarkup}/>
        
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
// this function is passed as second argument to connect
const mapDispatchToProps = (dispatch) => {
  return {
    validate: (value) => dispatch(validate(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Userpage);
