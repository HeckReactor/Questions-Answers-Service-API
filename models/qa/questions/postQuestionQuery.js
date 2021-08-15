module.exports = `
  INSERT INTO questions (
    body,
    username,
    email,
    product_id
  )
  VALUES (
    $1,
    $2,
    $3,
    $4
  )
  RETURNING id;
`;
