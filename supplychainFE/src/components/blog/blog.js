import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../styles/addblog.css'

export default class Blog extends Component {

    render() {
        const { isLoading } = this.props;
        return (
            <Fragment>
                <div className ="container-ckeditor">
                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
            </Fragment>
        )
    }
}

Blog.propTypes = {
    isLoading: PropTypes.bool
};