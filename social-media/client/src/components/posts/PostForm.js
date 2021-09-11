import React,{useState} from 'react'
import { addPost } from '../../actions/post'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const PostForm = ({addPost}) => {
    const [text,setText] = useState('');

    return (
        <div>
        <h1 class="large text-primary">
      Discussion
      </h1>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Poser toutes vos questions ...</h3>
        </div>
        <form className="form my-1" onSubmit={e => {e.preventDefault(); addPost({text}) ; setText('');}}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Créer une publication"
            value={text}
            onChange={e => setText(e.target.value) }
            required>
            </textarea>
          <input type="submit"   className="btn btn-dark my-1" value="Créer" />
        </form>
      </div>
      </div>
    )
}

PostForm.propTypes = {
    addPost:PropTypes.func.isRequired,


}

export default connect( null,{addPost})(PostForm)
