import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const StarRating = ({ rating, onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleRating = (newRating) => {
    setSelectedRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <View key={star} style={{ marginRight: 5 }}>
          <Icon
            name={star <= selectedRating ? 'star' : 'star-o'}
            size={20}
            color={star <= selectedRating ? 'red' : 'red'}
          />
        </View>
      ))}
    </View>
  );
};

export default StarRating;