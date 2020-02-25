import React from 'react';
class NotFoundPage extends React.Component {

    render() {
        return (
            <div className="wrapper text-center">
                <img src={require('../../styles/img/not_found_page.jpg')}
                    alt="Page Not Found 404"
                    height="100%"
                    width="100%"
                />
            </div>
        );
    }
}
export default NotFoundPage;