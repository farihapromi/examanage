import React from 'react';

class PrintComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.content}
      </div>
    );
  }
}

export default PrintComponent;
