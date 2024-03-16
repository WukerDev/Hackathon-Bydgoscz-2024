import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating, onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  // Synchronize component's state with props in case the external rating changes
  useEffect(() => {
    setSelectedRating(rating);
  }, [rating]);

  const handleRating = (newRating) => {
    setSelectedRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handleRating(star)}>
          <Icon
            name={star <= selectedRating ? 'star' : 'star-o'}
            size={20}
            color={star <= selectedRating ? 'red' : 'grey'} // You might want to differentiate the color of filled and unfilled stars for better UX
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;
