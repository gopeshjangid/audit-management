/**
 * Summary: Layout
 * Description: Layout component will call for getting the dynamic header, left, content of specific page
 * @author Gopesh Kumar Jangid.
 * @date  13.06.2021
 */
import React, { PureComponent } from 'react';
import Header from '../../components/header/header';

/**
 * @name Layout
 * @extends Component
 */
class Layout extends PureComponent {
  /**
   * render to html
   * @param {null}
   * @return {string}
   */
  render() {
    const wrapperClass = this.props.wrapperClass ? this.props.wrapperClass : '';
    return (
      <div className={'container-main ' + wrapperClass}>
        <Header />
        <main className="container page-container">{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
