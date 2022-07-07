import React from 'react';

import styles from './Paragraph.module.css';

const Paragraph: React.FC = ({ children }) => <p className={styles.root}>{children}</p>;

export default Paragraph;
