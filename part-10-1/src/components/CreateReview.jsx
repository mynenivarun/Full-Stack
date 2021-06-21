import React from 'react';
import { Button, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useReview from '../hooks/useReview';
import { useHistory } from "react-router-native";


export const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ margin: 15 }}>
        <FormikTextInput name="repoOwner" placeholder="Repository owner name" />
        <FormikTextInput name="repoName" placeholder="Repository name"/>
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100"/>
        <FormikTextInput name="review" placeholder="Review" multiline={true}/>
        <Button
          title="Create a review"
          onPress={onSubmit}
          testID="submitButton"
          style={{margin: 10, padding: 10}}
        />
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  repoOwner: yup
    .string()
    .required('Repository owner name is required'),
  repoName: yup
    .string()
    .required('Repository name is required'),
  rating: yup 
    .number()
    .min(0,'Rating must be larger than 0')
    .max(100,'Rating should not be larger than 100')
    .required('Rating is required')
});

const CreateReview = () => {
  const [createReview] = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repoOwner, repoName, rating, review} = values;

    try {
      const result = await createReview({ repoOwner, repoName, rating, review });
      history.push(`/repo/${result.data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    repoOwner: '',
    repoName: '',
    rating: '',
    review: ''
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;