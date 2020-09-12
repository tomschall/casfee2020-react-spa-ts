import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "channel" */
export type Channel = {
  __typename?: 'channel';
  /** An array relationship */
  channel_polls: Array<Channel_Poll>;
  /** An aggregated array relationship */
  channel_polls_aggregate: Channel_Poll_Aggregate;
  id: Scalars['Int'];
  is_private: Scalars['Boolean'];
  /** An array relationship */
  messages: Array<Message>;
  /** An aggregated array relationship */
  messages_aggregate: Message_Aggregate;
  name: Scalars['String'];
  owner_id: Scalars['String'];
  /** An object relationship */
  user: User;
  /** An array relationship */
  user_channels: Array<User_Channels>;
  /** An aggregated array relationship */
  user_channels_aggregate: User_Channels_Aggregate;
};


/** columns and relationships of "channel" */
export type ChannelChannel_PollsArgs = {
  distinct_on?: Maybe<Array<Channel_Poll_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Poll_Order_By>>;
  where?: Maybe<Channel_Poll_Bool_Exp>;
};


/** columns and relationships of "channel" */
export type ChannelChannel_Polls_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Poll_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Poll_Order_By>>;
  where?: Maybe<Channel_Poll_Bool_Exp>;
};


/** columns and relationships of "channel" */
export type ChannelMessagesArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** columns and relationships of "channel" */
export type ChannelMessages_AggregateArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** columns and relationships of "channel" */
export type ChannelUser_ChannelsArgs = {
  distinct_on?: Maybe<Array<User_Channels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Channels_Order_By>>;
  where?: Maybe<User_Channels_Bool_Exp>;
};


/** columns and relationships of "channel" */
export type ChannelUser_Channels_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Channels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Channels_Order_By>>;
  where?: Maybe<User_Channels_Bool_Exp>;
};

/** aggregated selection of "channel" */
export type Channel_Aggregate = {
  __typename?: 'channel_aggregate';
  aggregate?: Maybe<Channel_Aggregate_Fields>;
  nodes: Array<Channel>;
};

/** aggregate fields of "channel" */
export type Channel_Aggregate_Fields = {
  __typename?: 'channel_aggregate_fields';
  avg?: Maybe<Channel_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Channel_Max_Fields>;
  min?: Maybe<Channel_Min_Fields>;
  stddev?: Maybe<Channel_Stddev_Fields>;
  stddev_pop?: Maybe<Channel_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Channel_Stddev_Samp_Fields>;
  sum?: Maybe<Channel_Sum_Fields>;
  var_pop?: Maybe<Channel_Var_Pop_Fields>;
  var_samp?: Maybe<Channel_Var_Samp_Fields>;
  variance?: Maybe<Channel_Variance_Fields>;
};


/** aggregate fields of "channel" */
export type Channel_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Channel_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "channel" */
export type Channel_Aggregate_Order_By = {
  avg?: Maybe<Channel_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Channel_Max_Order_By>;
  min?: Maybe<Channel_Min_Order_By>;
  stddev?: Maybe<Channel_Stddev_Order_By>;
  stddev_pop?: Maybe<Channel_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Channel_Stddev_Samp_Order_By>;
  sum?: Maybe<Channel_Sum_Order_By>;
  var_pop?: Maybe<Channel_Var_Pop_Order_By>;
  var_samp?: Maybe<Channel_Var_Samp_Order_By>;
  variance?: Maybe<Channel_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "channel" */
export type Channel_Arr_Rel_Insert_Input = {
  data: Array<Channel_Insert_Input>;
  on_conflict?: Maybe<Channel_On_Conflict>;
};

/** aggregate avg on columns */
export type Channel_Avg_Fields = {
  __typename?: 'channel_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "channel" */
export type Channel_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "channel". All fields are combined with a logical 'AND'. */
export type Channel_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Channel_Bool_Exp>>>;
  _not?: Maybe<Channel_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Channel_Bool_Exp>>>;
  channel_polls?: Maybe<Channel_Poll_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  is_private?: Maybe<Boolean_Comparison_Exp>;
  messages?: Maybe<Message_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  user_channels?: Maybe<User_Channels_Bool_Exp>;
};

/** unique or primary key constraints on table "channel" */
export enum Channel_Constraint {
  /** unique or primary key constraint */
  ChannelNameKey = 'channel_name_key',
  /** unique or primary key constraint */
  ChannelPkey = 'channel_pkey'
}

/** input type for incrementing integer column in table "channel" */
export type Channel_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "channel" */
export type Channel_Insert_Input = {
  channel_polls?: Maybe<Channel_Poll_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  is_private?: Maybe<Scalars['Boolean']>;
  messages?: Maybe<Message_Arr_Rel_Insert_Input>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  user_channels?: Maybe<User_Channels_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Channel_Max_Fields = {
  __typename?: 'channel_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "channel" */
export type Channel_Max_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Channel_Min_Fields = {
  __typename?: 'channel_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "channel" */
export type Channel_Min_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "channel" */
export type Channel_Mutation_Response = {
  __typename?: 'channel_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Channel>;
};

/** input type for inserting object relation for remote table "channel" */
export type Channel_Obj_Rel_Insert_Input = {
  data: Channel_Insert_Input;
  on_conflict?: Maybe<Channel_On_Conflict>;
};

/** on conflict condition type for table "channel" */
export type Channel_On_Conflict = {
  constraint: Channel_Constraint;
  update_columns: Array<Channel_Update_Column>;
  where?: Maybe<Channel_Bool_Exp>;
};

/** ordering options when selecting data from "channel" */
export type Channel_Order_By = {
  channel_polls_aggregate?: Maybe<Channel_Poll_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  is_private?: Maybe<Order_By>;
  messages_aggregate?: Maybe<Message_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  user_channels_aggregate?: Maybe<User_Channels_Aggregate_Order_By>;
};

/** primary key columns input for table: "channel" */
export type Channel_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** columns and relationships of "channel_poll" */
export type Channel_Poll = {
  __typename?: 'channel_poll';
  /** An object relationship */
  channel: Channel;
  channel_id: Scalars['Int'];
  id: Scalars['Int'];
  /** An object relationship */
  poll_question: Poll_Questions;
  poll_questions: Scalars['Int'];
};

/** aggregated selection of "channel_poll" */
export type Channel_Poll_Aggregate = {
  __typename?: 'channel_poll_aggregate';
  aggregate?: Maybe<Channel_Poll_Aggregate_Fields>;
  nodes: Array<Channel_Poll>;
};

/** aggregate fields of "channel_poll" */
export type Channel_Poll_Aggregate_Fields = {
  __typename?: 'channel_poll_aggregate_fields';
  avg?: Maybe<Channel_Poll_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Channel_Poll_Max_Fields>;
  min?: Maybe<Channel_Poll_Min_Fields>;
  stddev?: Maybe<Channel_Poll_Stddev_Fields>;
  stddev_pop?: Maybe<Channel_Poll_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Channel_Poll_Stddev_Samp_Fields>;
  sum?: Maybe<Channel_Poll_Sum_Fields>;
  var_pop?: Maybe<Channel_Poll_Var_Pop_Fields>;
  var_samp?: Maybe<Channel_Poll_Var_Samp_Fields>;
  variance?: Maybe<Channel_Poll_Variance_Fields>;
};


/** aggregate fields of "channel_poll" */
export type Channel_Poll_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Channel_Poll_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "channel_poll" */
export type Channel_Poll_Aggregate_Order_By = {
  avg?: Maybe<Channel_Poll_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Channel_Poll_Max_Order_By>;
  min?: Maybe<Channel_Poll_Min_Order_By>;
  stddev?: Maybe<Channel_Poll_Stddev_Order_By>;
  stddev_pop?: Maybe<Channel_Poll_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Channel_Poll_Stddev_Samp_Order_By>;
  sum?: Maybe<Channel_Poll_Sum_Order_By>;
  var_pop?: Maybe<Channel_Poll_Var_Pop_Order_By>;
  var_samp?: Maybe<Channel_Poll_Var_Samp_Order_By>;
  variance?: Maybe<Channel_Poll_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "channel_poll" */
export type Channel_Poll_Arr_Rel_Insert_Input = {
  data: Array<Channel_Poll_Insert_Input>;
  on_conflict?: Maybe<Channel_Poll_On_Conflict>;
};

/** aggregate avg on columns */
export type Channel_Poll_Avg_Fields = {
  __typename?: 'channel_poll_avg_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  poll_questions?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "channel_poll" */
export type Channel_Poll_Avg_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "channel_poll". All fields are combined with a logical 'AND'. */
export type Channel_Poll_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Channel_Poll_Bool_Exp>>>;
  _not?: Maybe<Channel_Poll_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Channel_Poll_Bool_Exp>>>;
  channel?: Maybe<Channel_Bool_Exp>;
  channel_id?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  poll_question?: Maybe<Poll_Questions_Bool_Exp>;
  poll_questions?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "channel_poll" */
export enum Channel_Poll_Constraint {
  /** unique or primary key constraint */
  ChannelPollPkey = 'channel_poll_pkey'
}

/** input type for incrementing integer column in table "channel_poll" */
export type Channel_Poll_Inc_Input = {
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  poll_questions?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "channel_poll" */
export type Channel_Poll_Insert_Input = {
  channel?: Maybe<Channel_Obj_Rel_Insert_Input>;
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  poll_question?: Maybe<Poll_Questions_Obj_Rel_Insert_Input>;
  poll_questions?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Channel_Poll_Max_Fields = {
  __typename?: 'channel_poll_max_fields';
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  poll_questions?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "channel_poll" */
export type Channel_Poll_Max_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Channel_Poll_Min_Fields = {
  __typename?: 'channel_poll_min_fields';
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  poll_questions?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "channel_poll" */
export type Channel_Poll_Min_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** response of any mutation on the table "channel_poll" */
export type Channel_Poll_Mutation_Response = {
  __typename?: 'channel_poll_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Channel_Poll>;
};

/** input type for inserting object relation for remote table "channel_poll" */
export type Channel_Poll_Obj_Rel_Insert_Input = {
  data: Channel_Poll_Insert_Input;
  on_conflict?: Maybe<Channel_Poll_On_Conflict>;
};

/** on conflict condition type for table "channel_poll" */
export type Channel_Poll_On_Conflict = {
  constraint: Channel_Poll_Constraint;
  update_columns: Array<Channel_Poll_Update_Column>;
  where?: Maybe<Channel_Poll_Bool_Exp>;
};

/** ordering options when selecting data from "channel_poll" */
export type Channel_Poll_Order_By = {
  channel?: Maybe<Channel_Order_By>;
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_question?: Maybe<Poll_Questions_Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** primary key columns input for table: "channel_poll" */
export type Channel_Poll_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "channel_poll" */
export enum Channel_Poll_Select_Column {
  /** column name */
  ChannelId = 'channel_id',
  /** column name */
  Id = 'id',
  /** column name */
  PollQuestions = 'poll_questions'
}

/** input type for updating data in table "channel_poll" */
export type Channel_Poll_Set_Input = {
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  poll_questions?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Channel_Poll_Stddev_Fields = {
  __typename?: 'channel_poll_stddev_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  poll_questions?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "channel_poll" */
export type Channel_Poll_Stddev_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Channel_Poll_Stddev_Pop_Fields = {
  __typename?: 'channel_poll_stddev_pop_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  poll_questions?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "channel_poll" */
export type Channel_Poll_Stddev_Pop_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Channel_Poll_Stddev_Samp_Fields = {
  __typename?: 'channel_poll_stddev_samp_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  poll_questions?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "channel_poll" */
export type Channel_Poll_Stddev_Samp_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Channel_Poll_Sum_Fields = {
  __typename?: 'channel_poll_sum_fields';
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  poll_questions?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "channel_poll" */
export type Channel_Poll_Sum_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** update columns of table "channel_poll" */
export enum Channel_Poll_Update_Column {
  /** column name */
  ChannelId = 'channel_id',
  /** column name */
  Id = 'id',
  /** column name */
  PollQuestions = 'poll_questions'
}

/** aggregate var_pop on columns */
export type Channel_Poll_Var_Pop_Fields = {
  __typename?: 'channel_poll_var_pop_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  poll_questions?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "channel_poll" */
export type Channel_Poll_Var_Pop_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Channel_Poll_Var_Samp_Fields = {
  __typename?: 'channel_poll_var_samp_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  poll_questions?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "channel_poll" */
export type Channel_Poll_Var_Samp_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Channel_Poll_Variance_Fields = {
  __typename?: 'channel_poll_variance_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  poll_questions?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "channel_poll" */
export type Channel_Poll_Variance_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_questions?: Maybe<Order_By>;
};

/** select columns of table "channel" */
export enum Channel_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsPrivate = 'is_private',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id'
}

/** input type for updating data in table "channel" */
export type Channel_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  is_private?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Channel_Stddev_Fields = {
  __typename?: 'channel_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "channel" */
export type Channel_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Channel_Stddev_Pop_Fields = {
  __typename?: 'channel_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "channel" */
export type Channel_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Channel_Stddev_Samp_Fields = {
  __typename?: 'channel_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "channel" */
export type Channel_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Channel_Sum_Fields = {
  __typename?: 'channel_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "channel" */
export type Channel_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "channel_thread" */
export type Channel_Thread = {
  __typename?: 'channel_thread';
  /** An array relationship */
  channel_thread_messages: Array<Channel_Thread_Message>;
  /** An aggregated array relationship */
  channel_thread_messages_aggregate: Channel_Thread_Message_Aggregate;
  id: Scalars['Int'];
  /** An object relationship */
  message?: Maybe<Message>;
  message_id?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "channel_thread" */
export type Channel_ThreadChannel_Thread_MessagesArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Message_Order_By>>;
  where?: Maybe<Channel_Thread_Message_Bool_Exp>;
};


/** columns and relationships of "channel_thread" */
export type Channel_ThreadChannel_Thread_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Message_Order_By>>;
  where?: Maybe<Channel_Thread_Message_Bool_Exp>;
};

/** aggregated selection of "channel_thread" */
export type Channel_Thread_Aggregate = {
  __typename?: 'channel_thread_aggregate';
  aggregate?: Maybe<Channel_Thread_Aggregate_Fields>;
  nodes: Array<Channel_Thread>;
};

/** aggregate fields of "channel_thread" */
export type Channel_Thread_Aggregate_Fields = {
  __typename?: 'channel_thread_aggregate_fields';
  avg?: Maybe<Channel_Thread_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Channel_Thread_Max_Fields>;
  min?: Maybe<Channel_Thread_Min_Fields>;
  stddev?: Maybe<Channel_Thread_Stddev_Fields>;
  stddev_pop?: Maybe<Channel_Thread_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Channel_Thread_Stddev_Samp_Fields>;
  sum?: Maybe<Channel_Thread_Sum_Fields>;
  var_pop?: Maybe<Channel_Thread_Var_Pop_Fields>;
  var_samp?: Maybe<Channel_Thread_Var_Samp_Fields>;
  variance?: Maybe<Channel_Thread_Variance_Fields>;
};


/** aggregate fields of "channel_thread" */
export type Channel_Thread_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Channel_Thread_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "channel_thread" */
export type Channel_Thread_Aggregate_Order_By = {
  avg?: Maybe<Channel_Thread_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Channel_Thread_Max_Order_By>;
  min?: Maybe<Channel_Thread_Min_Order_By>;
  stddev?: Maybe<Channel_Thread_Stddev_Order_By>;
  stddev_pop?: Maybe<Channel_Thread_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Channel_Thread_Stddev_Samp_Order_By>;
  sum?: Maybe<Channel_Thread_Sum_Order_By>;
  var_pop?: Maybe<Channel_Thread_Var_Pop_Order_By>;
  var_samp?: Maybe<Channel_Thread_Var_Samp_Order_By>;
  variance?: Maybe<Channel_Thread_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "channel_thread" */
export type Channel_Thread_Arr_Rel_Insert_Input = {
  data: Array<Channel_Thread_Insert_Input>;
  on_conflict?: Maybe<Channel_Thread_On_Conflict>;
};

/** aggregate avg on columns */
export type Channel_Thread_Avg_Fields = {
  __typename?: 'channel_thread_avg_fields';
  id?: Maybe<Scalars['Float']>;
  message_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "channel_thread" */
export type Channel_Thread_Avg_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "channel_thread". All fields are combined with a logical 'AND'. */
export type Channel_Thread_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Channel_Thread_Bool_Exp>>>;
  _not?: Maybe<Channel_Thread_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Channel_Thread_Bool_Exp>>>;
  channel_thread_messages?: Maybe<Channel_Thread_Message_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  message?: Maybe<Message_Bool_Exp>;
  message_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "channel_thread" */
export enum Channel_Thread_Constraint {
  /** unique or primary key constraint */
  ChannelThreadPkey = 'channel_thread_pkey'
}

/** input type for incrementing integer column in table "channel_thread" */
export type Channel_Thread_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  message_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "channel_thread" */
export type Channel_Thread_Insert_Input = {
  channel_thread_messages?: Maybe<Channel_Thread_Message_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Message_Obj_Rel_Insert_Input>;
  message_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Channel_Thread_Max_Fields = {
  __typename?: 'channel_thread_max_fields';
  id?: Maybe<Scalars['Int']>;
  message_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "channel_thread" */
export type Channel_Thread_Max_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** columns and relationships of "channel_thread_message" */
export type Channel_Thread_Message = {
  __typename?: 'channel_thread_message';
  /** An object relationship */
  channel_thread: Channel_Thread;
  channel_thread_id: Scalars['Int'];
  id: Scalars['Int'];
  message: Scalars['String'];
  /** An object relationship */
  user: User;
  user_id: Scalars['String'];
};

/** aggregated selection of "channel_thread_message" */
export type Channel_Thread_Message_Aggregate = {
  __typename?: 'channel_thread_message_aggregate';
  aggregate?: Maybe<Channel_Thread_Message_Aggregate_Fields>;
  nodes: Array<Channel_Thread_Message>;
};

/** aggregate fields of "channel_thread_message" */
export type Channel_Thread_Message_Aggregate_Fields = {
  __typename?: 'channel_thread_message_aggregate_fields';
  avg?: Maybe<Channel_Thread_Message_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Channel_Thread_Message_Max_Fields>;
  min?: Maybe<Channel_Thread_Message_Min_Fields>;
  stddev?: Maybe<Channel_Thread_Message_Stddev_Fields>;
  stddev_pop?: Maybe<Channel_Thread_Message_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Channel_Thread_Message_Stddev_Samp_Fields>;
  sum?: Maybe<Channel_Thread_Message_Sum_Fields>;
  var_pop?: Maybe<Channel_Thread_Message_Var_Pop_Fields>;
  var_samp?: Maybe<Channel_Thread_Message_Var_Samp_Fields>;
  variance?: Maybe<Channel_Thread_Message_Variance_Fields>;
};


/** aggregate fields of "channel_thread_message" */
export type Channel_Thread_Message_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Channel_Thread_Message_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "channel_thread_message" */
export type Channel_Thread_Message_Aggregate_Order_By = {
  avg?: Maybe<Channel_Thread_Message_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Channel_Thread_Message_Max_Order_By>;
  min?: Maybe<Channel_Thread_Message_Min_Order_By>;
  stddev?: Maybe<Channel_Thread_Message_Stddev_Order_By>;
  stddev_pop?: Maybe<Channel_Thread_Message_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Channel_Thread_Message_Stddev_Samp_Order_By>;
  sum?: Maybe<Channel_Thread_Message_Sum_Order_By>;
  var_pop?: Maybe<Channel_Thread_Message_Var_Pop_Order_By>;
  var_samp?: Maybe<Channel_Thread_Message_Var_Samp_Order_By>;
  variance?: Maybe<Channel_Thread_Message_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "channel_thread_message" */
export type Channel_Thread_Message_Arr_Rel_Insert_Input = {
  data: Array<Channel_Thread_Message_Insert_Input>;
  on_conflict?: Maybe<Channel_Thread_Message_On_Conflict>;
};

/** aggregate avg on columns */
export type Channel_Thread_Message_Avg_Fields = {
  __typename?: 'channel_thread_message_avg_fields';
  channel_thread_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Avg_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "channel_thread_message". All fields are combined with a logical 'AND'. */
export type Channel_Thread_Message_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Channel_Thread_Message_Bool_Exp>>>;
  _not?: Maybe<Channel_Thread_Message_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Channel_Thread_Message_Bool_Exp>>>;
  channel_thread?: Maybe<Channel_Thread_Bool_Exp>;
  channel_thread_id?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  message?: Maybe<String_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "channel_thread_message" */
export enum Channel_Thread_Message_Constraint {
  /** unique or primary key constraint */
  ChannelThreadMessagePkey = 'channel_thread_message_pkey'
}

/** input type for incrementing integer column in table "channel_thread_message" */
export type Channel_Thread_Message_Inc_Input = {
  channel_thread_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "channel_thread_message" */
export type Channel_Thread_Message_Insert_Input = {
  channel_thread?: Maybe<Channel_Thread_Obj_Rel_Insert_Input>;
  channel_thread_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Channel_Thread_Message_Max_Fields = {
  __typename?: 'channel_thread_message_max_fields';
  channel_thread_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Max_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Channel_Thread_Message_Min_Fields = {
  __typename?: 'channel_thread_message_min_fields';
  channel_thread_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Min_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "channel_thread_message" */
export type Channel_Thread_Message_Mutation_Response = {
  __typename?: 'channel_thread_message_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Channel_Thread_Message>;
};

/** input type for inserting object relation for remote table "channel_thread_message" */
export type Channel_Thread_Message_Obj_Rel_Insert_Input = {
  data: Channel_Thread_Message_Insert_Input;
  on_conflict?: Maybe<Channel_Thread_Message_On_Conflict>;
};

/** on conflict condition type for table "channel_thread_message" */
export type Channel_Thread_Message_On_Conflict = {
  constraint: Channel_Thread_Message_Constraint;
  update_columns: Array<Channel_Thread_Message_Update_Column>;
  where?: Maybe<Channel_Thread_Message_Bool_Exp>;
};

/** ordering options when selecting data from "channel_thread_message" */
export type Channel_Thread_Message_Order_By = {
  channel_thread?: Maybe<Channel_Thread_Order_By>;
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "channel_thread_message" */
export type Channel_Thread_Message_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "channel_thread_message" */
export enum Channel_Thread_Message_Select_Column {
  /** column name */
  ChannelThreadId = 'channel_thread_id',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "channel_thread_message" */
export type Channel_Thread_Message_Set_Input = {
  channel_thread_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Channel_Thread_Message_Stddev_Fields = {
  __typename?: 'channel_thread_message_stddev_fields';
  channel_thread_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Stddev_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Channel_Thread_Message_Stddev_Pop_Fields = {
  __typename?: 'channel_thread_message_stddev_pop_fields';
  channel_thread_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Stddev_Pop_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Channel_Thread_Message_Stddev_Samp_Fields = {
  __typename?: 'channel_thread_message_stddev_samp_fields';
  channel_thread_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Stddev_Samp_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Channel_Thread_Message_Sum_Fields = {
  __typename?: 'channel_thread_message_sum_fields';
  channel_thread_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Sum_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** update columns of table "channel_thread_message" */
export enum Channel_Thread_Message_Update_Column {
  /** column name */
  ChannelThreadId = 'channel_thread_id',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Channel_Thread_Message_Var_Pop_Fields = {
  __typename?: 'channel_thread_message_var_pop_fields';
  channel_thread_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Var_Pop_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Channel_Thread_Message_Var_Samp_Fields = {
  __typename?: 'channel_thread_message_var_samp_fields';
  channel_thread_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Var_Samp_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Channel_Thread_Message_Variance_Fields = {
  __typename?: 'channel_thread_message_variance_fields';
  channel_thread_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "channel_thread_message" */
export type Channel_Thread_Message_Variance_Order_By = {
  channel_thread_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Channel_Thread_Min_Fields = {
  __typename?: 'channel_thread_min_fields';
  id?: Maybe<Scalars['Int']>;
  message_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "channel_thread" */
export type Channel_Thread_Min_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "channel_thread" */
export type Channel_Thread_Mutation_Response = {
  __typename?: 'channel_thread_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Channel_Thread>;
};

/** input type for inserting object relation for remote table "channel_thread" */
export type Channel_Thread_Obj_Rel_Insert_Input = {
  data: Channel_Thread_Insert_Input;
  on_conflict?: Maybe<Channel_Thread_On_Conflict>;
};

/** on conflict condition type for table "channel_thread" */
export type Channel_Thread_On_Conflict = {
  constraint: Channel_Thread_Constraint;
  update_columns: Array<Channel_Thread_Update_Column>;
  where?: Maybe<Channel_Thread_Bool_Exp>;
};

/** ordering options when selecting data from "channel_thread" */
export type Channel_Thread_Order_By = {
  channel_thread_messages_aggregate?: Maybe<Channel_Thread_Message_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Message_Order_By>;
  message_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "channel_thread" */
export type Channel_Thread_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "channel_thread" */
export enum Channel_Thread_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  MessageId = 'message_id'
}

/** input type for updating data in table "channel_thread" */
export type Channel_Thread_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  message_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Channel_Thread_Stddev_Fields = {
  __typename?: 'channel_thread_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  message_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "channel_thread" */
export type Channel_Thread_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Channel_Thread_Stddev_Pop_Fields = {
  __typename?: 'channel_thread_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  message_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "channel_thread" */
export type Channel_Thread_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Channel_Thread_Stddev_Samp_Fields = {
  __typename?: 'channel_thread_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  message_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "channel_thread" */
export type Channel_Thread_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Channel_Thread_Sum_Fields = {
  __typename?: 'channel_thread_sum_fields';
  id?: Maybe<Scalars['Int']>;
  message_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "channel_thread" */
export type Channel_Thread_Sum_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** update columns of table "channel_thread" */
export enum Channel_Thread_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  MessageId = 'message_id'
}

/** aggregate var_pop on columns */
export type Channel_Thread_Var_Pop_Fields = {
  __typename?: 'channel_thread_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  message_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "channel_thread" */
export type Channel_Thread_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Channel_Thread_Var_Samp_Fields = {
  __typename?: 'channel_thread_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  message_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "channel_thread" */
export type Channel_Thread_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Channel_Thread_Variance_Fields = {
  __typename?: 'channel_thread_variance_fields';
  id?: Maybe<Scalars['Float']>;
  message_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "channel_thread" */
export type Channel_Thread_Variance_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** update columns of table "channel" */
export enum Channel_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsPrivate = 'is_private',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id'
}

/** aggregate var_pop on columns */
export type Channel_Var_Pop_Fields = {
  __typename?: 'channel_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "channel" */
export type Channel_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Channel_Var_Samp_Fields = {
  __typename?: 'channel_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "channel" */
export type Channel_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Channel_Variance_Fields = {
  __typename?: 'channel_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "channel" */
export type Channel_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "message" */
export type Message = {
  __typename?: 'message';
  /** An object relationship */
  channel: Channel;
  channel_id: Scalars['Int'];
  /** An array relationship */
  channel_threads: Array<Channel_Thread>;
  /** An aggregated array relationship */
  channel_threads_aggregate: Channel_Thread_Aggregate;
  id: Scalars['Int'];
  text: Scalars['String'];
  timestamp: Scalars['timestamptz'];
  /** An object relationship */
  user: User;
  user_id: Scalars['String'];
};


/** columns and relationships of "message" */
export type MessageChannel_ThreadsArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Order_By>>;
  where?: Maybe<Channel_Thread_Bool_Exp>;
};


/** columns and relationships of "message" */
export type MessageChannel_Threads_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Order_By>>;
  where?: Maybe<Channel_Thread_Bool_Exp>;
};

/** aggregated selection of "message" */
export type Message_Aggregate = {
  __typename?: 'message_aggregate';
  aggregate?: Maybe<Message_Aggregate_Fields>;
  nodes: Array<Message>;
};

/** aggregate fields of "message" */
export type Message_Aggregate_Fields = {
  __typename?: 'message_aggregate_fields';
  avg?: Maybe<Message_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Message_Max_Fields>;
  min?: Maybe<Message_Min_Fields>;
  stddev?: Maybe<Message_Stddev_Fields>;
  stddev_pop?: Maybe<Message_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Message_Stddev_Samp_Fields>;
  sum?: Maybe<Message_Sum_Fields>;
  var_pop?: Maybe<Message_Var_Pop_Fields>;
  var_samp?: Maybe<Message_Var_Samp_Fields>;
  variance?: Maybe<Message_Variance_Fields>;
};


/** aggregate fields of "message" */
export type Message_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Message_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "message" */
export type Message_Aggregate_Order_By = {
  avg?: Maybe<Message_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Message_Max_Order_By>;
  min?: Maybe<Message_Min_Order_By>;
  stddev?: Maybe<Message_Stddev_Order_By>;
  stddev_pop?: Maybe<Message_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Message_Stddev_Samp_Order_By>;
  sum?: Maybe<Message_Sum_Order_By>;
  var_pop?: Maybe<Message_Var_Pop_Order_By>;
  var_samp?: Maybe<Message_Var_Samp_Order_By>;
  variance?: Maybe<Message_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "message" */
export type Message_Arr_Rel_Insert_Input = {
  data: Array<Message_Insert_Input>;
  on_conflict?: Maybe<Message_On_Conflict>;
};

/** aggregate avg on columns */
export type Message_Avg_Fields = {
  __typename?: 'message_avg_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "message" */
export type Message_Avg_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "message". All fields are combined with a logical 'AND'. */
export type Message_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Message_Bool_Exp>>>;
  _not?: Maybe<Message_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Message_Bool_Exp>>>;
  channel?: Maybe<Channel_Bool_Exp>;
  channel_id?: Maybe<Int_Comparison_Exp>;
  channel_threads?: Maybe<Channel_Thread_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  text?: Maybe<String_Comparison_Exp>;
  timestamp?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "message" */
export enum Message_Constraint {
  /** unique or primary key constraint */
  MessagePkey = 'message_pkey'
}

/** input type for incrementing integer column in table "message" */
export type Message_Inc_Input = {
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "message" */
export type Message_Insert_Input = {
  channel?: Maybe<Channel_Obj_Rel_Insert_Input>;
  channel_id?: Maybe<Scalars['Int']>;
  channel_threads?: Maybe<Channel_Thread_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Message_Max_Fields = {
  __typename?: 'message_max_fields';
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "message" */
export type Message_Max_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Message_Min_Fields = {
  __typename?: 'message_min_fields';
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "message" */
export type Message_Min_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "message" */
export type Message_Mutation_Response = {
  __typename?: 'message_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Message>;
};

/** input type for inserting object relation for remote table "message" */
export type Message_Obj_Rel_Insert_Input = {
  data: Message_Insert_Input;
  on_conflict?: Maybe<Message_On_Conflict>;
};

/** on conflict condition type for table "message" */
export type Message_On_Conflict = {
  constraint: Message_Constraint;
  update_columns: Array<Message_Update_Column>;
  where?: Maybe<Message_Bool_Exp>;
};

/** ordering options when selecting data from "message" */
export type Message_Order_By = {
  channel?: Maybe<Channel_Order_By>;
  channel_id?: Maybe<Order_By>;
  channel_threads_aggregate?: Maybe<Channel_Thread_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "message" */
export type Message_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "message" */
export enum Message_Select_Column {
  /** column name */
  ChannelId = 'channel_id',
  /** column name */
  Id = 'id',
  /** column name */
  Text = 'text',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "message" */
export type Message_Set_Input = {
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Message_Stddev_Fields = {
  __typename?: 'message_stddev_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "message" */
export type Message_Stddev_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Message_Stddev_Pop_Fields = {
  __typename?: 'message_stddev_pop_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "message" */
export type Message_Stddev_Pop_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Message_Stddev_Samp_Fields = {
  __typename?: 'message_stddev_samp_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "message" */
export type Message_Stddev_Samp_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Message_Sum_Fields = {
  __typename?: 'message_sum_fields';
  channel_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "message" */
export type Message_Sum_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** update columns of table "message" */
export enum Message_Update_Column {
  /** column name */
  ChannelId = 'channel_id',
  /** column name */
  Id = 'id',
  /** column name */
  Text = 'text',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Message_Var_Pop_Fields = {
  __typename?: 'message_var_pop_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "message" */
export type Message_Var_Pop_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Message_Var_Samp_Fields = {
  __typename?: 'message_var_samp_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "message" */
export type Message_Var_Samp_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Message_Variance_Fields = {
  __typename?: 'message_variance_fields';
  channel_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "message" */
export type Message_Variance_Order_By = {
  channel_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "channel" */
  delete_channel?: Maybe<Channel_Mutation_Response>;
  /** delete single row from the table: "channel" */
  delete_channel_by_pk?: Maybe<Channel>;
  /** delete data from the table: "channel_poll" */
  delete_channel_poll?: Maybe<Channel_Poll_Mutation_Response>;
  /** delete single row from the table: "channel_poll" */
  delete_channel_poll_by_pk?: Maybe<Channel_Poll>;
  /** delete data from the table: "channel_thread" */
  delete_channel_thread?: Maybe<Channel_Thread_Mutation_Response>;
  /** delete single row from the table: "channel_thread" */
  delete_channel_thread_by_pk?: Maybe<Channel_Thread>;
  /** delete data from the table: "channel_thread_message" */
  delete_channel_thread_message?: Maybe<Channel_Thread_Message_Mutation_Response>;
  /** delete single row from the table: "channel_thread_message" */
  delete_channel_thread_message_by_pk?: Maybe<Channel_Thread_Message>;
  /** delete data from the table: "message" */
  delete_message?: Maybe<Message_Mutation_Response>;
  /** delete single row from the table: "message" */
  delete_message_by_pk?: Maybe<Message>;
  /** delete data from the table: "poll_anwers" */
  delete_poll_anwers?: Maybe<Poll_Anwers_Mutation_Response>;
  /** delete single row from the table: "poll_anwers" */
  delete_poll_anwers_by_pk?: Maybe<Poll_Anwers>;
  /** delete data from the table: "poll_questions" */
  delete_poll_questions?: Maybe<Poll_Questions_Mutation_Response>;
  /** delete single row from the table: "poll_questions" */
  delete_poll_questions_by_pk?: Maybe<Poll_Questions>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** delete data from the table: "user_channels" */
  delete_user_channels?: Maybe<User_Channels_Mutation_Response>;
  /** delete single row from the table: "user_channels" */
  delete_user_channels_by_pk?: Maybe<User_Channels>;
  /** delete data from the table: "user_online" */
  delete_user_online?: Maybe<User_Online_Mutation_Response>;
  /** delete data from the table: "user_typing" */
  delete_user_typing?: Maybe<User_Typing_Mutation_Response>;
  /** insert data into the table: "channel" */
  insert_channel?: Maybe<Channel_Mutation_Response>;
  /** insert a single row into the table: "channel" */
  insert_channel_one?: Maybe<Channel>;
  /** insert data into the table: "channel_poll" */
  insert_channel_poll?: Maybe<Channel_Poll_Mutation_Response>;
  /** insert a single row into the table: "channel_poll" */
  insert_channel_poll_one?: Maybe<Channel_Poll>;
  /** insert data into the table: "channel_thread" */
  insert_channel_thread?: Maybe<Channel_Thread_Mutation_Response>;
  /** insert data into the table: "channel_thread_message" */
  insert_channel_thread_message?: Maybe<Channel_Thread_Message_Mutation_Response>;
  /** insert a single row into the table: "channel_thread_message" */
  insert_channel_thread_message_one?: Maybe<Channel_Thread_Message>;
  /** insert a single row into the table: "channel_thread" */
  insert_channel_thread_one?: Maybe<Channel_Thread>;
  /** insert data into the table: "message" */
  insert_message?: Maybe<Message_Mutation_Response>;
  /** insert a single row into the table: "message" */
  insert_message_one?: Maybe<Message>;
  /** insert data into the table: "poll_anwers" */
  insert_poll_anwers?: Maybe<Poll_Anwers_Mutation_Response>;
  /** insert a single row into the table: "poll_anwers" */
  insert_poll_anwers_one?: Maybe<Poll_Anwers>;
  /** insert data into the table: "poll_questions" */
  insert_poll_questions?: Maybe<Poll_Questions_Mutation_Response>;
  /** insert a single row into the table: "poll_questions" */
  insert_poll_questions_one?: Maybe<Poll_Questions>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert data into the table: "user_channels" */
  insert_user_channels?: Maybe<User_Channels_Mutation_Response>;
  /** insert a single row into the table: "user_channels" */
  insert_user_channels_one?: Maybe<User_Channels>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** insert data into the table: "user_online" */
  insert_user_online?: Maybe<User_Online_Mutation_Response>;
  /** insert a single row into the table: "user_online" */
  insert_user_online_one?: Maybe<User_Online>;
  /** insert data into the table: "user_typing" */
  insert_user_typing?: Maybe<User_Typing_Mutation_Response>;
  /** insert a single row into the table: "user_typing" */
  insert_user_typing_one?: Maybe<User_Typing>;
  /** update data of the table: "channel" */
  update_channel?: Maybe<Channel_Mutation_Response>;
  /** update single row of the table: "channel" */
  update_channel_by_pk?: Maybe<Channel>;
  /** update data of the table: "channel_poll" */
  update_channel_poll?: Maybe<Channel_Poll_Mutation_Response>;
  /** update single row of the table: "channel_poll" */
  update_channel_poll_by_pk?: Maybe<Channel_Poll>;
  /** update data of the table: "channel_thread" */
  update_channel_thread?: Maybe<Channel_Thread_Mutation_Response>;
  /** update single row of the table: "channel_thread" */
  update_channel_thread_by_pk?: Maybe<Channel_Thread>;
  /** update data of the table: "channel_thread_message" */
  update_channel_thread_message?: Maybe<Channel_Thread_Message_Mutation_Response>;
  /** update single row of the table: "channel_thread_message" */
  update_channel_thread_message_by_pk?: Maybe<Channel_Thread_Message>;
  /** update data of the table: "message" */
  update_message?: Maybe<Message_Mutation_Response>;
  /** update single row of the table: "message" */
  update_message_by_pk?: Maybe<Message>;
  /** update data of the table: "poll_anwers" */
  update_poll_anwers?: Maybe<Poll_Anwers_Mutation_Response>;
  /** update single row of the table: "poll_anwers" */
  update_poll_anwers_by_pk?: Maybe<Poll_Anwers>;
  /** update data of the table: "poll_questions" */
  update_poll_questions?: Maybe<Poll_Questions_Mutation_Response>;
  /** update single row of the table: "poll_questions" */
  update_poll_questions_by_pk?: Maybe<Poll_Questions>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update data of the table: "user_channels" */
  update_user_channels?: Maybe<User_Channels_Mutation_Response>;
  /** update single row of the table: "user_channels" */
  update_user_channels_by_pk?: Maybe<User_Channels>;
  /** update data of the table: "user_online" */
  update_user_online?: Maybe<User_Online_Mutation_Response>;
  /** update data of the table: "user_typing" */
  update_user_typing?: Maybe<User_Typing_Mutation_Response>;
};


/** mutation root */
export type Mutation_RootDelete_ChannelArgs = {
  where: Channel_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Channel_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Channel_PollArgs = {
  where: Channel_Poll_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Channel_Poll_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Channel_ThreadArgs = {
  where: Channel_Thread_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Channel_Thread_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Channel_Thread_MessageArgs = {
  where: Channel_Thread_Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Channel_Thread_Message_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_MessageArgs = {
  where: Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Message_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Poll_AnwersArgs = {
  where: Poll_Anwers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Poll_Anwers_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Poll_QuestionsArgs = {
  where: Poll_Questions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Poll_Questions_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_User_ChannelsArgs = {
  where: User_Channels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Channels_By_PkArgs = {
  channel_id: Scalars['Int'];
  user_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_User_OnlineArgs = {
  where: User_Online_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_TypingArgs = {
  where: User_Typing_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsert_ChannelArgs = {
  objects: Array<Channel_Insert_Input>;
  on_conflict?: Maybe<Channel_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Channel_OneArgs = {
  object: Channel_Insert_Input;
  on_conflict?: Maybe<Channel_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Channel_PollArgs = {
  objects: Array<Channel_Poll_Insert_Input>;
  on_conflict?: Maybe<Channel_Poll_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Channel_Poll_OneArgs = {
  object: Channel_Poll_Insert_Input;
  on_conflict?: Maybe<Channel_Poll_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Channel_ThreadArgs = {
  objects: Array<Channel_Thread_Insert_Input>;
  on_conflict?: Maybe<Channel_Thread_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Channel_Thread_MessageArgs = {
  objects: Array<Channel_Thread_Message_Insert_Input>;
  on_conflict?: Maybe<Channel_Thread_Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Channel_Thread_Message_OneArgs = {
  object: Channel_Thread_Message_Insert_Input;
  on_conflict?: Maybe<Channel_Thread_Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Channel_Thread_OneArgs = {
  object: Channel_Thread_Insert_Input;
  on_conflict?: Maybe<Channel_Thread_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MessageArgs = {
  objects: Array<Message_Insert_Input>;
  on_conflict?: Maybe<Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Message_OneArgs = {
  object: Message_Insert_Input;
  on_conflict?: Maybe<Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Poll_AnwersArgs = {
  objects: Array<Poll_Anwers_Insert_Input>;
  on_conflict?: Maybe<Poll_Anwers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Poll_Anwers_OneArgs = {
  object: Poll_Anwers_Insert_Input;
  on_conflict?: Maybe<Poll_Anwers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Poll_QuestionsArgs = {
  objects: Array<Poll_Questions_Insert_Input>;
  on_conflict?: Maybe<Poll_Questions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Poll_Questions_OneArgs = {
  object: Poll_Questions_Insert_Input;
  on_conflict?: Maybe<Poll_Questions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_ChannelsArgs = {
  objects: Array<User_Channels_Insert_Input>;
  on_conflict?: Maybe<User_Channels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Channels_OneArgs = {
  object: User_Channels_Insert_Input;
  on_conflict?: Maybe<User_Channels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OnlineArgs = {
  objects: Array<User_Online_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_User_Online_OneArgs = {
  object: User_Online_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_User_TypingArgs = {
  objects: Array<User_Typing_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_User_Typing_OneArgs = {
  object: User_Typing_Insert_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ChannelArgs = {
  _inc?: Maybe<Channel_Inc_Input>;
  _set?: Maybe<Channel_Set_Input>;
  where: Channel_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Channel_By_PkArgs = {
  _inc?: Maybe<Channel_Inc_Input>;
  _set?: Maybe<Channel_Set_Input>;
  pk_columns: Channel_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Channel_PollArgs = {
  _inc?: Maybe<Channel_Poll_Inc_Input>;
  _set?: Maybe<Channel_Poll_Set_Input>;
  where: Channel_Poll_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Channel_Poll_By_PkArgs = {
  _inc?: Maybe<Channel_Poll_Inc_Input>;
  _set?: Maybe<Channel_Poll_Set_Input>;
  pk_columns: Channel_Poll_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Channel_ThreadArgs = {
  _inc?: Maybe<Channel_Thread_Inc_Input>;
  _set?: Maybe<Channel_Thread_Set_Input>;
  where: Channel_Thread_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Channel_Thread_By_PkArgs = {
  _inc?: Maybe<Channel_Thread_Inc_Input>;
  _set?: Maybe<Channel_Thread_Set_Input>;
  pk_columns: Channel_Thread_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Channel_Thread_MessageArgs = {
  _inc?: Maybe<Channel_Thread_Message_Inc_Input>;
  _set?: Maybe<Channel_Thread_Message_Set_Input>;
  where: Channel_Thread_Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Channel_Thread_Message_By_PkArgs = {
  _inc?: Maybe<Channel_Thread_Message_Inc_Input>;
  _set?: Maybe<Channel_Thread_Message_Set_Input>;
  pk_columns: Channel_Thread_Message_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_MessageArgs = {
  _inc?: Maybe<Message_Inc_Input>;
  _set?: Maybe<Message_Set_Input>;
  where: Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Message_By_PkArgs = {
  _inc?: Maybe<Message_Inc_Input>;
  _set?: Maybe<Message_Set_Input>;
  pk_columns: Message_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Poll_AnwersArgs = {
  _inc?: Maybe<Poll_Anwers_Inc_Input>;
  _set?: Maybe<Poll_Anwers_Set_Input>;
  where: Poll_Anwers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Poll_Anwers_By_PkArgs = {
  _inc?: Maybe<Poll_Anwers_Inc_Input>;
  _set?: Maybe<Poll_Anwers_Set_Input>;
  pk_columns: Poll_Anwers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Poll_QuestionsArgs = {
  _inc?: Maybe<Poll_Questions_Inc_Input>;
  _set?: Maybe<Poll_Questions_Set_Input>;
  where: Poll_Questions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Poll_Questions_By_PkArgs = {
  _inc?: Maybe<Poll_Questions_Inc_Input>;
  _set?: Maybe<Poll_Questions_Set_Input>;
  pk_columns: Poll_Questions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _inc?: Maybe<User_Inc_Input>;
  _set?: Maybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _inc?: Maybe<User_Inc_Input>;
  _set?: Maybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_ChannelsArgs = {
  _inc?: Maybe<User_Channels_Inc_Input>;
  _set?: Maybe<User_Channels_Set_Input>;
  where: User_Channels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Channels_By_PkArgs = {
  _inc?: Maybe<User_Channels_Inc_Input>;
  _set?: Maybe<User_Channels_Set_Input>;
  pk_columns: User_Channels_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_OnlineArgs = {
  _inc?: Maybe<User_Online_Inc_Input>;
  _set?: Maybe<User_Online_Set_Input>;
  where: User_Online_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_TypingArgs = {
  _inc?: Maybe<User_Typing_Inc_Input>;
  _set?: Maybe<User_Typing_Set_Input>;
  where: User_Typing_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "poll_anwers" */
export type Poll_Anwers = {
  __typename?: 'poll_anwers';
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An object relationship */
  poll_question: Poll_Questions;
  question_id: Scalars['Int'];
  text: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['String'];
  votes: Scalars['Int'];
};

/** aggregated selection of "poll_anwers" */
export type Poll_Anwers_Aggregate = {
  __typename?: 'poll_anwers_aggregate';
  aggregate?: Maybe<Poll_Anwers_Aggregate_Fields>;
  nodes: Array<Poll_Anwers>;
};

/** aggregate fields of "poll_anwers" */
export type Poll_Anwers_Aggregate_Fields = {
  __typename?: 'poll_anwers_aggregate_fields';
  avg?: Maybe<Poll_Anwers_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Poll_Anwers_Max_Fields>;
  min?: Maybe<Poll_Anwers_Min_Fields>;
  stddev?: Maybe<Poll_Anwers_Stddev_Fields>;
  stddev_pop?: Maybe<Poll_Anwers_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Poll_Anwers_Stddev_Samp_Fields>;
  sum?: Maybe<Poll_Anwers_Sum_Fields>;
  var_pop?: Maybe<Poll_Anwers_Var_Pop_Fields>;
  var_samp?: Maybe<Poll_Anwers_Var_Samp_Fields>;
  variance?: Maybe<Poll_Anwers_Variance_Fields>;
};


/** aggregate fields of "poll_anwers" */
export type Poll_Anwers_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Poll_Anwers_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "poll_anwers" */
export type Poll_Anwers_Aggregate_Order_By = {
  avg?: Maybe<Poll_Anwers_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Poll_Anwers_Max_Order_By>;
  min?: Maybe<Poll_Anwers_Min_Order_By>;
  stddev?: Maybe<Poll_Anwers_Stddev_Order_By>;
  stddev_pop?: Maybe<Poll_Anwers_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Poll_Anwers_Stddev_Samp_Order_By>;
  sum?: Maybe<Poll_Anwers_Sum_Order_By>;
  var_pop?: Maybe<Poll_Anwers_Var_Pop_Order_By>;
  var_samp?: Maybe<Poll_Anwers_Var_Samp_Order_By>;
  variance?: Maybe<Poll_Anwers_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "poll_anwers" */
export type Poll_Anwers_Arr_Rel_Insert_Input = {
  data: Array<Poll_Anwers_Insert_Input>;
  on_conflict?: Maybe<Poll_Anwers_On_Conflict>;
};

/** aggregate avg on columns */
export type Poll_Anwers_Avg_Fields = {
  __typename?: 'poll_anwers_avg_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  votes?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "poll_anwers" */
export type Poll_Anwers_Avg_Order_By = {
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "poll_anwers". All fields are combined with a logical 'AND'. */
export type Poll_Anwers_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Poll_Anwers_Bool_Exp>>>;
  _not?: Maybe<Poll_Anwers_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Poll_Anwers_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  poll_question?: Maybe<Poll_Questions_Bool_Exp>;
  question_id?: Maybe<Int_Comparison_Exp>;
  text?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
  votes?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "poll_anwers" */
export enum Poll_Anwers_Constraint {
  /** unique or primary key constraint */
  PollAnwersPkey = 'poll_anwers_pkey'
}

/** input type for incrementing integer column in table "poll_anwers" */
export type Poll_Anwers_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  question_id?: Maybe<Scalars['Int']>;
  votes?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "poll_anwers" */
export type Poll_Anwers_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  poll_question?: Maybe<Poll_Questions_Obj_Rel_Insert_Input>;
  question_id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  votes?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Poll_Anwers_Max_Fields = {
  __typename?: 'poll_anwers_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  question_id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  votes?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "poll_anwers" */
export type Poll_Anwers_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Poll_Anwers_Min_Fields = {
  __typename?: 'poll_anwers_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  question_id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  votes?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "poll_anwers" */
export type Poll_Anwers_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** response of any mutation on the table "poll_anwers" */
export type Poll_Anwers_Mutation_Response = {
  __typename?: 'poll_anwers_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Poll_Anwers>;
};

/** input type for inserting object relation for remote table "poll_anwers" */
export type Poll_Anwers_Obj_Rel_Insert_Input = {
  data: Poll_Anwers_Insert_Input;
  on_conflict?: Maybe<Poll_Anwers_On_Conflict>;
};

/** on conflict condition type for table "poll_anwers" */
export type Poll_Anwers_On_Conflict = {
  constraint: Poll_Anwers_Constraint;
  update_columns: Array<Poll_Anwers_Update_Column>;
  where?: Maybe<Poll_Anwers_Bool_Exp>;
};

/** ordering options when selecting data from "poll_anwers" */
export type Poll_Anwers_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  poll_question?: Maybe<Poll_Questions_Order_By>;
  question_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** primary key columns input for table: "poll_anwers" */
export type Poll_Anwers_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "poll_anwers" */
export enum Poll_Anwers_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  QuestionId = 'question_id',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Votes = 'votes'
}

/** input type for updating data in table "poll_anwers" */
export type Poll_Anwers_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  question_id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  votes?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Poll_Anwers_Stddev_Fields = {
  __typename?: 'poll_anwers_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  votes?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "poll_anwers" */
export type Poll_Anwers_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Poll_Anwers_Stddev_Pop_Fields = {
  __typename?: 'poll_anwers_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  votes?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "poll_anwers" */
export type Poll_Anwers_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Poll_Anwers_Stddev_Samp_Fields = {
  __typename?: 'poll_anwers_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  votes?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "poll_anwers" */
export type Poll_Anwers_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Poll_Anwers_Sum_Fields = {
  __typename?: 'poll_anwers_sum_fields';
  id?: Maybe<Scalars['Int']>;
  question_id?: Maybe<Scalars['Int']>;
  votes?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "poll_anwers" */
export type Poll_Anwers_Sum_Order_By = {
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** update columns of table "poll_anwers" */
export enum Poll_Anwers_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  QuestionId = 'question_id',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Votes = 'votes'
}

/** aggregate var_pop on columns */
export type Poll_Anwers_Var_Pop_Fields = {
  __typename?: 'poll_anwers_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  votes?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "poll_anwers" */
export type Poll_Anwers_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Poll_Anwers_Var_Samp_Fields = {
  __typename?: 'poll_anwers_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  votes?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "poll_anwers" */
export type Poll_Anwers_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Poll_Anwers_Variance_Fields = {
  __typename?: 'poll_anwers_variance_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  votes?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "poll_anwers" */
export type Poll_Anwers_Variance_Order_By = {
  id?: Maybe<Order_By>;
  question_id?: Maybe<Order_By>;
  votes?: Maybe<Order_By>;
};

/** columns and relationships of "poll_questions" */
export type Poll_Questions = {
  __typename?: 'poll_questions';
  /** An array relationship */
  channel_polls: Array<Channel_Poll>;
  /** An aggregated array relationship */
  channel_polls_aggregate: Channel_Poll_Aggregate;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  is_active: Scalars['Boolean'];
  owner_id: Scalars['String'];
  /** An array relationship */
  poll_anwers: Array<Poll_Anwers>;
  /** An aggregated array relationship */
  poll_anwers_aggregate: Poll_Anwers_Aggregate;
  text: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "poll_questions" */
export type Poll_QuestionsChannel_PollsArgs = {
  distinct_on?: Maybe<Array<Channel_Poll_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Poll_Order_By>>;
  where?: Maybe<Channel_Poll_Bool_Exp>;
};


/** columns and relationships of "poll_questions" */
export type Poll_QuestionsChannel_Polls_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Poll_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Poll_Order_By>>;
  where?: Maybe<Channel_Poll_Bool_Exp>;
};


/** columns and relationships of "poll_questions" */
export type Poll_QuestionsPoll_AnwersArgs = {
  distinct_on?: Maybe<Array<Poll_Anwers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Anwers_Order_By>>;
  where?: Maybe<Poll_Anwers_Bool_Exp>;
};


/** columns and relationships of "poll_questions" */
export type Poll_QuestionsPoll_Anwers_AggregateArgs = {
  distinct_on?: Maybe<Array<Poll_Anwers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Anwers_Order_By>>;
  where?: Maybe<Poll_Anwers_Bool_Exp>;
};

/** aggregated selection of "poll_questions" */
export type Poll_Questions_Aggregate = {
  __typename?: 'poll_questions_aggregate';
  aggregate?: Maybe<Poll_Questions_Aggregate_Fields>;
  nodes: Array<Poll_Questions>;
};

/** aggregate fields of "poll_questions" */
export type Poll_Questions_Aggregate_Fields = {
  __typename?: 'poll_questions_aggregate_fields';
  avg?: Maybe<Poll_Questions_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Poll_Questions_Max_Fields>;
  min?: Maybe<Poll_Questions_Min_Fields>;
  stddev?: Maybe<Poll_Questions_Stddev_Fields>;
  stddev_pop?: Maybe<Poll_Questions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Poll_Questions_Stddev_Samp_Fields>;
  sum?: Maybe<Poll_Questions_Sum_Fields>;
  var_pop?: Maybe<Poll_Questions_Var_Pop_Fields>;
  var_samp?: Maybe<Poll_Questions_Var_Samp_Fields>;
  variance?: Maybe<Poll_Questions_Variance_Fields>;
};


/** aggregate fields of "poll_questions" */
export type Poll_Questions_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Poll_Questions_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "poll_questions" */
export type Poll_Questions_Aggregate_Order_By = {
  avg?: Maybe<Poll_Questions_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Poll_Questions_Max_Order_By>;
  min?: Maybe<Poll_Questions_Min_Order_By>;
  stddev?: Maybe<Poll_Questions_Stddev_Order_By>;
  stddev_pop?: Maybe<Poll_Questions_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Poll_Questions_Stddev_Samp_Order_By>;
  sum?: Maybe<Poll_Questions_Sum_Order_By>;
  var_pop?: Maybe<Poll_Questions_Var_Pop_Order_By>;
  var_samp?: Maybe<Poll_Questions_Var_Samp_Order_By>;
  variance?: Maybe<Poll_Questions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "poll_questions" */
export type Poll_Questions_Arr_Rel_Insert_Input = {
  data: Array<Poll_Questions_Insert_Input>;
  on_conflict?: Maybe<Poll_Questions_On_Conflict>;
};

/** aggregate avg on columns */
export type Poll_Questions_Avg_Fields = {
  __typename?: 'poll_questions_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "poll_questions" */
export type Poll_Questions_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "poll_questions". All fields are combined with a logical 'AND'. */
export type Poll_Questions_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Poll_Questions_Bool_Exp>>>;
  _not?: Maybe<Poll_Questions_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Poll_Questions_Bool_Exp>>>;
  channel_polls?: Maybe<Channel_Poll_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  is_active?: Maybe<Boolean_Comparison_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
  poll_anwers?: Maybe<Poll_Anwers_Bool_Exp>;
  text?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "poll_questions" */
export enum Poll_Questions_Constraint {
  /** unique or primary key constraint */
  PollQuestionsPkey = 'poll_questions_pkey'
}

/** input type for incrementing integer column in table "poll_questions" */
export type Poll_Questions_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "poll_questions" */
export type Poll_Questions_Insert_Input = {
  channel_polls?: Maybe<Channel_Poll_Arr_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  owner_id?: Maybe<Scalars['String']>;
  poll_anwers?: Maybe<Poll_Anwers_Arr_Rel_Insert_Input>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Poll_Questions_Max_Fields = {
  __typename?: 'poll_questions_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  owner_id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "poll_questions" */
export type Poll_Questions_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Poll_Questions_Min_Fields = {
  __typename?: 'poll_questions_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  owner_id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "poll_questions" */
export type Poll_Questions_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "poll_questions" */
export type Poll_Questions_Mutation_Response = {
  __typename?: 'poll_questions_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Poll_Questions>;
};

/** input type for inserting object relation for remote table "poll_questions" */
export type Poll_Questions_Obj_Rel_Insert_Input = {
  data: Poll_Questions_Insert_Input;
  on_conflict?: Maybe<Poll_Questions_On_Conflict>;
};

/** on conflict condition type for table "poll_questions" */
export type Poll_Questions_On_Conflict = {
  constraint: Poll_Questions_Constraint;
  update_columns: Array<Poll_Questions_Update_Column>;
  where?: Maybe<Poll_Questions_Bool_Exp>;
};

/** ordering options when selecting data from "poll_questions" */
export type Poll_Questions_Order_By = {
  channel_polls_aggregate?: Maybe<Channel_Poll_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_active?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  poll_anwers_aggregate?: Maybe<Poll_Anwers_Aggregate_Order_By>;
  text?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "poll_questions" */
export type Poll_Questions_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "poll_questions" */
export enum Poll_Questions_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "poll_questions" */
export type Poll_Questions_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  owner_id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Poll_Questions_Stddev_Fields = {
  __typename?: 'poll_questions_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "poll_questions" */
export type Poll_Questions_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Poll_Questions_Stddev_Pop_Fields = {
  __typename?: 'poll_questions_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "poll_questions" */
export type Poll_Questions_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Poll_Questions_Stddev_Samp_Fields = {
  __typename?: 'poll_questions_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "poll_questions" */
export type Poll_Questions_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Poll_Questions_Sum_Fields = {
  __typename?: 'poll_questions_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "poll_questions" */
export type Poll_Questions_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "poll_questions" */
export enum Poll_Questions_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Poll_Questions_Var_Pop_Fields = {
  __typename?: 'poll_questions_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "poll_questions" */
export type Poll_Questions_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Poll_Questions_Var_Samp_Fields = {
  __typename?: 'poll_questions_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "poll_questions" */
export type Poll_Questions_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Poll_Questions_Variance_Fields = {
  __typename?: 'poll_questions_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "poll_questions" */
export type Poll_Questions_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "channel" */
  channel: Array<Channel>;
  /** fetch aggregated fields from the table: "channel" */
  channel_aggregate: Channel_Aggregate;
  /** fetch data from the table: "channel" using primary key columns */
  channel_by_pk?: Maybe<Channel>;
  /** fetch data from the table: "channel_poll" */
  channel_poll: Array<Channel_Poll>;
  /** fetch aggregated fields from the table: "channel_poll" */
  channel_poll_aggregate: Channel_Poll_Aggregate;
  /** fetch data from the table: "channel_poll" using primary key columns */
  channel_poll_by_pk?: Maybe<Channel_Poll>;
  /** fetch data from the table: "channel_thread" */
  channel_thread: Array<Channel_Thread>;
  /** fetch aggregated fields from the table: "channel_thread" */
  channel_thread_aggregate: Channel_Thread_Aggregate;
  /** fetch data from the table: "channel_thread" using primary key columns */
  channel_thread_by_pk?: Maybe<Channel_Thread>;
  /** fetch data from the table: "channel_thread_message" */
  channel_thread_message: Array<Channel_Thread_Message>;
  /** fetch aggregated fields from the table: "channel_thread_message" */
  channel_thread_message_aggregate: Channel_Thread_Message_Aggregate;
  /** fetch data from the table: "channel_thread_message" using primary key columns */
  channel_thread_message_by_pk?: Maybe<Channel_Thread_Message>;
  /** fetch data from the table: "message" */
  message: Array<Message>;
  /** fetch aggregated fields from the table: "message" */
  message_aggregate: Message_Aggregate;
  /** fetch data from the table: "message" using primary key columns */
  message_by_pk?: Maybe<Message>;
  /** fetch data from the table: "poll_anwers" */
  poll_anwers: Array<Poll_Anwers>;
  /** fetch aggregated fields from the table: "poll_anwers" */
  poll_anwers_aggregate: Poll_Anwers_Aggregate;
  /** fetch data from the table: "poll_anwers" using primary key columns */
  poll_anwers_by_pk?: Maybe<Poll_Anwers>;
  /** fetch data from the table: "poll_questions" */
  poll_questions: Array<Poll_Questions>;
  /** fetch aggregated fields from the table: "poll_questions" */
  poll_questions_aggregate: Poll_Questions_Aggregate;
  /** fetch data from the table: "poll_questions" using primary key columns */
  poll_questions_by_pk?: Maybe<Poll_Questions>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_channels" */
  user_channels: Array<User_Channels>;
  /** fetch aggregated fields from the table: "user_channels" */
  user_channels_aggregate: User_Channels_Aggregate;
  /** fetch data from the table: "user_channels" using primary key columns */
  user_channels_by_pk?: Maybe<User_Channels>;
  /** fetch data from the table: "user_online" */
  user_online: Array<User_Online>;
  /** fetch aggregated fields from the table: "user_online" */
  user_online_aggregate: User_Online_Aggregate;
  /** fetch data from the table: "user_typing" */
  user_typing: Array<User_Typing>;
  /** fetch aggregated fields from the table: "user_typing" */
  user_typing_aggregate: User_Typing_Aggregate;
};


/** query root */
export type Query_RootChannelArgs = {
  distinct_on?: Maybe<Array<Channel_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Order_By>>;
  where?: Maybe<Channel_Bool_Exp>;
};


/** query root */
export type Query_RootChannel_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Order_By>>;
  where?: Maybe<Channel_Bool_Exp>;
};


/** query root */
export type Query_RootChannel_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootChannel_PollArgs = {
  distinct_on?: Maybe<Array<Channel_Poll_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Poll_Order_By>>;
  where?: Maybe<Channel_Poll_Bool_Exp>;
};


/** query root */
export type Query_RootChannel_Poll_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Poll_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Poll_Order_By>>;
  where?: Maybe<Channel_Poll_Bool_Exp>;
};


/** query root */
export type Query_RootChannel_Poll_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootChannel_ThreadArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Order_By>>;
  where?: Maybe<Channel_Thread_Bool_Exp>;
};


/** query root */
export type Query_RootChannel_Thread_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Order_By>>;
  where?: Maybe<Channel_Thread_Bool_Exp>;
};


/** query root */
export type Query_RootChannel_Thread_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootChannel_Thread_MessageArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Message_Order_By>>;
  where?: Maybe<Channel_Thread_Message_Bool_Exp>;
};


/** query root */
export type Query_RootChannel_Thread_Message_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Message_Order_By>>;
  where?: Maybe<Channel_Thread_Message_Bool_Exp>;
};


/** query root */
export type Query_RootChannel_Thread_Message_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootMessageArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** query root */
export type Query_RootMessage_AggregateArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** query root */
export type Query_RootMessage_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootPoll_AnwersArgs = {
  distinct_on?: Maybe<Array<Poll_Anwers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Anwers_Order_By>>;
  where?: Maybe<Poll_Anwers_Bool_Exp>;
};


/** query root */
export type Query_RootPoll_Anwers_AggregateArgs = {
  distinct_on?: Maybe<Array<Poll_Anwers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Anwers_Order_By>>;
  where?: Maybe<Poll_Anwers_Bool_Exp>;
};


/** query root */
export type Query_RootPoll_Anwers_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootPoll_QuestionsArgs = {
  distinct_on?: Maybe<Array<Poll_Questions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Questions_Order_By>>;
  where?: Maybe<Poll_Questions_Bool_Exp>;
};


/** query root */
export type Query_RootPoll_Questions_AggregateArgs = {
  distinct_on?: Maybe<Array<Poll_Questions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Questions_Order_By>>;
  where?: Maybe<Poll_Questions_Bool_Exp>;
};


/** query root */
export type Query_RootPoll_Questions_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUser_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootUser_ChannelsArgs = {
  distinct_on?: Maybe<Array<User_Channels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Channels_Order_By>>;
  where?: Maybe<User_Channels_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Channels_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Channels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Channels_Order_By>>;
  where?: Maybe<User_Channels_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Channels_By_PkArgs = {
  channel_id: Scalars['Int'];
  user_id: Scalars['String'];
};


/** query root */
export type Query_RootUser_OnlineArgs = {
  distinct_on?: Maybe<Array<User_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Online_Order_By>>;
  where?: Maybe<User_Online_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Online_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Online_Order_By>>;
  where?: Maybe<User_Online_Bool_Exp>;
};


/** query root */
export type Query_RootUser_TypingArgs = {
  distinct_on?: Maybe<Array<User_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Typing_Order_By>>;
  where?: Maybe<User_Typing_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Typing_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Typing_Order_By>>;
  where?: Maybe<User_Typing_Bool_Exp>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "channel" */
  channel: Array<Channel>;
  /** fetch aggregated fields from the table: "channel" */
  channel_aggregate: Channel_Aggregate;
  /** fetch data from the table: "channel" using primary key columns */
  channel_by_pk?: Maybe<Channel>;
  /** fetch data from the table: "channel_poll" */
  channel_poll: Array<Channel_Poll>;
  /** fetch aggregated fields from the table: "channel_poll" */
  channel_poll_aggregate: Channel_Poll_Aggregate;
  /** fetch data from the table: "channel_poll" using primary key columns */
  channel_poll_by_pk?: Maybe<Channel_Poll>;
  /** fetch data from the table: "channel_thread" */
  channel_thread: Array<Channel_Thread>;
  /** fetch aggregated fields from the table: "channel_thread" */
  channel_thread_aggregate: Channel_Thread_Aggregate;
  /** fetch data from the table: "channel_thread" using primary key columns */
  channel_thread_by_pk?: Maybe<Channel_Thread>;
  /** fetch data from the table: "channel_thread_message" */
  channel_thread_message: Array<Channel_Thread_Message>;
  /** fetch aggregated fields from the table: "channel_thread_message" */
  channel_thread_message_aggregate: Channel_Thread_Message_Aggregate;
  /** fetch data from the table: "channel_thread_message" using primary key columns */
  channel_thread_message_by_pk?: Maybe<Channel_Thread_Message>;
  /** fetch data from the table: "message" */
  message: Array<Message>;
  /** fetch aggregated fields from the table: "message" */
  message_aggregate: Message_Aggregate;
  /** fetch data from the table: "message" using primary key columns */
  message_by_pk?: Maybe<Message>;
  /** fetch data from the table: "poll_anwers" */
  poll_anwers: Array<Poll_Anwers>;
  /** fetch aggregated fields from the table: "poll_anwers" */
  poll_anwers_aggregate: Poll_Anwers_Aggregate;
  /** fetch data from the table: "poll_anwers" using primary key columns */
  poll_anwers_by_pk?: Maybe<Poll_Anwers>;
  /** fetch data from the table: "poll_questions" */
  poll_questions: Array<Poll_Questions>;
  /** fetch aggregated fields from the table: "poll_questions" */
  poll_questions_aggregate: Poll_Questions_Aggregate;
  /** fetch data from the table: "poll_questions" using primary key columns */
  poll_questions_by_pk?: Maybe<Poll_Questions>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_channels" */
  user_channels: Array<User_Channels>;
  /** fetch aggregated fields from the table: "user_channels" */
  user_channels_aggregate: User_Channels_Aggregate;
  /** fetch data from the table: "user_channels" using primary key columns */
  user_channels_by_pk?: Maybe<User_Channels>;
  /** fetch data from the table: "user_online" */
  user_online: Array<User_Online>;
  /** fetch aggregated fields from the table: "user_online" */
  user_online_aggregate: User_Online_Aggregate;
  /** fetch data from the table: "user_typing" */
  user_typing: Array<User_Typing>;
  /** fetch aggregated fields from the table: "user_typing" */
  user_typing_aggregate: User_Typing_Aggregate;
};


/** subscription root */
export type Subscription_RootChannelArgs = {
  distinct_on?: Maybe<Array<Channel_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Order_By>>;
  where?: Maybe<Channel_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChannel_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Order_By>>;
  where?: Maybe<Channel_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChannel_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootChannel_PollArgs = {
  distinct_on?: Maybe<Array<Channel_Poll_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Poll_Order_By>>;
  where?: Maybe<Channel_Poll_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChannel_Poll_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Poll_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Poll_Order_By>>;
  where?: Maybe<Channel_Poll_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChannel_Poll_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootChannel_ThreadArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Order_By>>;
  where?: Maybe<Channel_Thread_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChannel_Thread_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Order_By>>;
  where?: Maybe<Channel_Thread_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChannel_Thread_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootChannel_Thread_MessageArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Message_Order_By>>;
  where?: Maybe<Channel_Thread_Message_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChannel_Thread_Message_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Message_Order_By>>;
  where?: Maybe<Channel_Thread_Message_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChannel_Thread_Message_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootMessageArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessage_AggregateArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessage_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootPoll_AnwersArgs = {
  distinct_on?: Maybe<Array<Poll_Anwers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Anwers_Order_By>>;
  where?: Maybe<Poll_Anwers_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPoll_Anwers_AggregateArgs = {
  distinct_on?: Maybe<Array<Poll_Anwers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Anwers_Order_By>>;
  where?: Maybe<Poll_Anwers_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPoll_Anwers_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootPoll_QuestionsArgs = {
  distinct_on?: Maybe<Array<Poll_Questions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Questions_Order_By>>;
  where?: Maybe<Poll_Questions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPoll_Questions_AggregateArgs = {
  distinct_on?: Maybe<Array<Poll_Questions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poll_Questions_Order_By>>;
  where?: Maybe<Poll_Questions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPoll_Questions_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootUser_ChannelsArgs = {
  distinct_on?: Maybe<Array<User_Channels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Channels_Order_By>>;
  where?: Maybe<User_Channels_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Channels_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Channels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Channels_Order_By>>;
  where?: Maybe<User_Channels_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Channels_By_PkArgs = {
  channel_id: Scalars['Int'];
  user_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUser_OnlineArgs = {
  distinct_on?: Maybe<Array<User_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Online_Order_By>>;
  where?: Maybe<User_Online_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Online_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Online_Order_By>>;
  where?: Maybe<User_Online_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_TypingArgs = {
  distinct_on?: Maybe<Array<User_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Typing_Order_By>>;
  where?: Maybe<User_Typing_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Typing_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Typing_Order_By>>;
  where?: Maybe<User_Typing_Bool_Exp>;
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/**
 * This table stores user data
 * 
 * 
 * columns and relationships of "user"
 */
export type User = {
  __typename?: 'user';
  auth0_user_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  channel_thread_messages: Array<Channel_Thread_Message>;
  /** An aggregated array relationship */
  channel_thread_messages_aggregate: Channel_Thread_Message_Aggregate;
  /** An array relationship */
  channels: Array<Channel>;
  /** An aggregated array relationship */
  channels_aggregate: Channel_Aggregate;
  id: Scalars['Int'];
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  messages: Array<Message>;
  /** An aggregated array relationship */
  messages_aggregate: Message_Aggregate;
  /** An array relationship */
  user_channels: Array<User_Channels>;
  /** An aggregated array relationship */
  user_channels_aggregate: User_Channels_Aggregate;
  username: Scalars['String'];
};


/**
 * This table stores user data
 * 
 * 
 * columns and relationships of "user"
 */
export type UserChannel_Thread_MessagesArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Message_Order_By>>;
  where?: Maybe<Channel_Thread_Message_Bool_Exp>;
};


/**
 * This table stores user data
 * 
 * 
 * columns and relationships of "user"
 */
export type UserChannel_Thread_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Thread_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Thread_Message_Order_By>>;
  where?: Maybe<Channel_Thread_Message_Bool_Exp>;
};


/**
 * This table stores user data
 * 
 * 
 * columns and relationships of "user"
 */
export type UserChannelsArgs = {
  distinct_on?: Maybe<Array<Channel_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Order_By>>;
  where?: Maybe<Channel_Bool_Exp>;
};


/**
 * This table stores user data
 * 
 * 
 * columns and relationships of "user"
 */
export type UserChannels_AggregateArgs = {
  distinct_on?: Maybe<Array<Channel_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Channel_Order_By>>;
  where?: Maybe<Channel_Bool_Exp>;
};


/**
 * This table stores user data
 * 
 * 
 * columns and relationships of "user"
 */
export type UserMessagesArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/**
 * This table stores user data
 * 
 * 
 * columns and relationships of "user"
 */
export type UserMessages_AggregateArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/**
 * This table stores user data
 * 
 * 
 * columns and relationships of "user"
 */
export type UserUser_ChannelsArgs = {
  distinct_on?: Maybe<Array<User_Channels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Channels_Order_By>>;
  where?: Maybe<User_Channels_Bool_Exp>;
};


/**
 * This table stores user data
 * 
 * 
 * columns and relationships of "user"
 */
export type UserUser_Channels_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Channels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Channels_Order_By>>;
  where?: Maybe<User_Channels_Bool_Exp>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  avg?: Maybe<User_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Max_Order_By>;
  min?: Maybe<User_Min_Order_By>;
  stddev?: Maybe<User_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Sum_Order_By>;
  var_pop?: Maybe<User_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Var_Samp_Order_By>;
  variance?: Maybe<User_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user" */
export type User_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  auth0_user_id?: Maybe<String_Comparison_Exp>;
  channel_thread_messages?: Maybe<Channel_Thread_Message_Bool_Exp>;
  channels?: Maybe<Channel_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  last_seen?: Maybe<Timestamptz_Comparison_Exp>;
  last_typed?: Maybe<Timestamptz_Comparison_Exp>;
  messages?: Maybe<Message_Bool_Exp>;
  user_channels?: Maybe<User_Channels_Bool_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** columns and relationships of "user_channels" */
export type User_Channels = {
  __typename?: 'user_channels';
  /** An object relationship */
  channel: Channel;
  channel_id: Scalars['Int'];
  /** An object relationship */
  user: User;
  user_id: Scalars['String'];
};

/** aggregated selection of "user_channels" */
export type User_Channels_Aggregate = {
  __typename?: 'user_channels_aggregate';
  aggregate?: Maybe<User_Channels_Aggregate_Fields>;
  nodes: Array<User_Channels>;
};

/** aggregate fields of "user_channels" */
export type User_Channels_Aggregate_Fields = {
  __typename?: 'user_channels_aggregate_fields';
  avg?: Maybe<User_Channels_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Channels_Max_Fields>;
  min?: Maybe<User_Channels_Min_Fields>;
  stddev?: Maybe<User_Channels_Stddev_Fields>;
  stddev_pop?: Maybe<User_Channels_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Channels_Stddev_Samp_Fields>;
  sum?: Maybe<User_Channels_Sum_Fields>;
  var_pop?: Maybe<User_Channels_Var_Pop_Fields>;
  var_samp?: Maybe<User_Channels_Var_Samp_Fields>;
  variance?: Maybe<User_Channels_Variance_Fields>;
};


/** aggregate fields of "user_channels" */
export type User_Channels_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Channels_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_channels" */
export type User_Channels_Aggregate_Order_By = {
  avg?: Maybe<User_Channels_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Channels_Max_Order_By>;
  min?: Maybe<User_Channels_Min_Order_By>;
  stddev?: Maybe<User_Channels_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Channels_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Channels_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Channels_Sum_Order_By>;
  var_pop?: Maybe<User_Channels_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Channels_Var_Samp_Order_By>;
  variance?: Maybe<User_Channels_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_channels" */
export type User_Channels_Arr_Rel_Insert_Input = {
  data: Array<User_Channels_Insert_Input>;
  on_conflict?: Maybe<User_Channels_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Channels_Avg_Fields = {
  __typename?: 'user_channels_avg_fields';
  channel_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_channels" */
export type User_Channels_Avg_Order_By = {
  channel_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_channels". All fields are combined with a logical 'AND'. */
export type User_Channels_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Channels_Bool_Exp>>>;
  _not?: Maybe<User_Channels_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Channels_Bool_Exp>>>;
  channel?: Maybe<Channel_Bool_Exp>;
  channel_id?: Maybe<Int_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_channels" */
export enum User_Channels_Constraint {
  /** unique or primary key constraint */
  UserChannelsPkey = 'user_channels_pkey'
}

/** input type for incrementing integer column in table "user_channels" */
export type User_Channels_Inc_Input = {
  channel_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_channels" */
export type User_Channels_Insert_Input = {
  channel?: Maybe<Channel_Obj_Rel_Insert_Input>;
  channel_id?: Maybe<Scalars['Int']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Channels_Max_Fields = {
  __typename?: 'user_channels_max_fields';
  channel_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_channels" */
export type User_Channels_Max_Order_By = {
  channel_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Channels_Min_Fields = {
  __typename?: 'user_channels_min_fields';
  channel_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_channels" */
export type User_Channels_Min_Order_By = {
  channel_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_channels" */
export type User_Channels_Mutation_Response = {
  __typename?: 'user_channels_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Channels>;
};

/** input type for inserting object relation for remote table "user_channels" */
export type User_Channels_Obj_Rel_Insert_Input = {
  data: User_Channels_Insert_Input;
  on_conflict?: Maybe<User_Channels_On_Conflict>;
};

/** on conflict condition type for table "user_channels" */
export type User_Channels_On_Conflict = {
  constraint: User_Channels_Constraint;
  update_columns: Array<User_Channels_Update_Column>;
  where?: Maybe<User_Channels_Bool_Exp>;
};

/** ordering options when selecting data from "user_channels" */
export type User_Channels_Order_By = {
  channel?: Maybe<Channel_Order_By>;
  channel_id?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "user_channels" */
export type User_Channels_Pk_Columns_Input = {
  channel_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** select columns of table "user_channels" */
export enum User_Channels_Select_Column {
  /** column name */
  ChannelId = 'channel_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_channels" */
export type User_Channels_Set_Input = {
  channel_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Channels_Stddev_Fields = {
  __typename?: 'user_channels_stddev_fields';
  channel_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_channels" */
export type User_Channels_Stddev_Order_By = {
  channel_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Channels_Stddev_Pop_Fields = {
  __typename?: 'user_channels_stddev_pop_fields';
  channel_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_channels" */
export type User_Channels_Stddev_Pop_Order_By = {
  channel_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Channels_Stddev_Samp_Fields = {
  __typename?: 'user_channels_stddev_samp_fields';
  channel_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_channels" */
export type User_Channels_Stddev_Samp_Order_By = {
  channel_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Channels_Sum_Fields = {
  __typename?: 'user_channels_sum_fields';
  channel_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_channels" */
export type User_Channels_Sum_Order_By = {
  channel_id?: Maybe<Order_By>;
};

/** update columns of table "user_channels" */
export enum User_Channels_Update_Column {
  /** column name */
  ChannelId = 'channel_id',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type User_Channels_Var_Pop_Fields = {
  __typename?: 'user_channels_var_pop_fields';
  channel_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_channels" */
export type User_Channels_Var_Pop_Order_By = {
  channel_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Channels_Var_Samp_Fields = {
  __typename?: 'user_channels_var_samp_fields';
  channel_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_channels" */
export type User_Channels_Var_Samp_Order_By = {
  channel_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Channels_Variance_Fields = {
  __typename?: 'user_channels_variance_fields';
  channel_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_channels" */
export type User_Channels_Variance_Order_By = {
  channel_id?: Maybe<Order_By>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserAuth0UserIdKey = 'user_auth0_user_id_key',
  /** unique or primary key constraint */
  UserPkey = 'user_pkey'
}

/** input type for incrementing integer column in table "user" */
export type User_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  auth0_user_id?: Maybe<Scalars['String']>;
  channel_thread_messages?: Maybe<Channel_Thread_Message_Arr_Rel_Insert_Input>;
  channels?: Maybe<Channel_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  messages?: Maybe<Message_Arr_Rel_Insert_Input>;
  user_channels?: Maybe<User_Channels_Arr_Rel_Insert_Input>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  auth0_user_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  auth0_user_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  last_typed?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  auth0_user_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  auth0_user_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  last_typed?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns: Array<User_Update_Column>;
  where?: Maybe<User_Bool_Exp>;
};

/** columns and relationships of "user_online" */
export type User_Online = {
  __typename?: 'user_online';
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregated selection of "user_online" */
export type User_Online_Aggregate = {
  __typename?: 'user_online_aggregate';
  aggregate?: Maybe<User_Online_Aggregate_Fields>;
  nodes: Array<User_Online>;
};

/** aggregate fields of "user_online" */
export type User_Online_Aggregate_Fields = {
  __typename?: 'user_online_aggregate_fields';
  avg?: Maybe<User_Online_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Online_Max_Fields>;
  min?: Maybe<User_Online_Min_Fields>;
  stddev?: Maybe<User_Online_Stddev_Fields>;
  stddev_pop?: Maybe<User_Online_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Online_Stddev_Samp_Fields>;
  sum?: Maybe<User_Online_Sum_Fields>;
  var_pop?: Maybe<User_Online_Var_Pop_Fields>;
  var_samp?: Maybe<User_Online_Var_Samp_Fields>;
  variance?: Maybe<User_Online_Variance_Fields>;
};


/** aggregate fields of "user_online" */
export type User_Online_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Online_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_online" */
export type User_Online_Aggregate_Order_By = {
  avg?: Maybe<User_Online_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Online_Max_Order_By>;
  min?: Maybe<User_Online_Min_Order_By>;
  stddev?: Maybe<User_Online_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Online_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Online_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Online_Sum_Order_By>;
  var_pop?: Maybe<User_Online_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Online_Var_Samp_Order_By>;
  variance?: Maybe<User_Online_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_online" */
export type User_Online_Arr_Rel_Insert_Input = {
  data: Array<User_Online_Insert_Input>;
};

/** aggregate avg on columns */
export type User_Online_Avg_Fields = {
  __typename?: 'user_online_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_online" */
export type User_Online_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_online". All fields are combined with a logical 'AND'. */
export type User_Online_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Online_Bool_Exp>>>;
  _not?: Maybe<User_Online_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Online_Bool_Exp>>>;
  id?: Maybe<Int_Comparison_Exp>;
  last_seen?: Maybe<Timestamptz_Comparison_Exp>;
  last_typed?: Maybe<Timestamptz_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** input type for incrementing integer column in table "user_online" */
export type User_Online_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_online" */
export type User_Online_Insert_Input = {
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Online_Max_Fields = {
  __typename?: 'user_online_max_fields';
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_online" */
export type User_Online_Max_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  last_typed?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Online_Min_Fields = {
  __typename?: 'user_online_min_fields';
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_online" */
export type User_Online_Min_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  last_typed?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_online" */
export type User_Online_Mutation_Response = {
  __typename?: 'user_online_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Online>;
};

/** input type for inserting object relation for remote table "user_online" */
export type User_Online_Obj_Rel_Insert_Input = {
  data: User_Online_Insert_Input;
};

/** ordering options when selecting data from "user_online" */
export type User_Online_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  last_typed?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** select columns of table "user_online" */
export enum User_Online_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  LastTyped = 'last_typed',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "user_online" */
export type User_Online_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Online_Stddev_Fields = {
  __typename?: 'user_online_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_online" */
export type User_Online_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Online_Stddev_Pop_Fields = {
  __typename?: 'user_online_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_online" */
export type User_Online_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Online_Stddev_Samp_Fields = {
  __typename?: 'user_online_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_online" */
export type User_Online_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Online_Sum_Fields = {
  __typename?: 'user_online_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_online" */
export type User_Online_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type User_Online_Var_Pop_Fields = {
  __typename?: 'user_online_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_online" */
export type User_Online_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Online_Var_Samp_Fields = {
  __typename?: 'user_online_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_online" */
export type User_Online_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Online_Variance_Fields = {
  __typename?: 'user_online_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_online" */
export type User_Online_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  auth0_user_id?: Maybe<Order_By>;
  channel_thread_messages_aggregate?: Maybe<Channel_Thread_Message_Aggregate_Order_By>;
  channels_aggregate?: Maybe<Channel_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  last_typed?: Maybe<Order_By>;
  messages_aggregate?: Maybe<Message_Aggregate_Order_By>;
  user_channels_aggregate?: Maybe<User_Channels_Aggregate_Order_By>;
  username?: Maybe<Order_By>;
};

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  Auth0UserId = 'auth0_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  LastTyped = 'last_typed',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  auth0_user_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user" */
export type User_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user" */
export type User_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user" */
export type User_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user" */
export type User_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "user_typing" */
export type User_Typing = {
  __typename?: 'user_typing';
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregated selection of "user_typing" */
export type User_Typing_Aggregate = {
  __typename?: 'user_typing_aggregate';
  aggregate?: Maybe<User_Typing_Aggregate_Fields>;
  nodes: Array<User_Typing>;
};

/** aggregate fields of "user_typing" */
export type User_Typing_Aggregate_Fields = {
  __typename?: 'user_typing_aggregate_fields';
  avg?: Maybe<User_Typing_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Typing_Max_Fields>;
  min?: Maybe<User_Typing_Min_Fields>;
  stddev?: Maybe<User_Typing_Stddev_Fields>;
  stddev_pop?: Maybe<User_Typing_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Typing_Stddev_Samp_Fields>;
  sum?: Maybe<User_Typing_Sum_Fields>;
  var_pop?: Maybe<User_Typing_Var_Pop_Fields>;
  var_samp?: Maybe<User_Typing_Var_Samp_Fields>;
  variance?: Maybe<User_Typing_Variance_Fields>;
};


/** aggregate fields of "user_typing" */
export type User_Typing_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Typing_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_typing" */
export type User_Typing_Aggregate_Order_By = {
  avg?: Maybe<User_Typing_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Typing_Max_Order_By>;
  min?: Maybe<User_Typing_Min_Order_By>;
  stddev?: Maybe<User_Typing_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Typing_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Typing_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Typing_Sum_Order_By>;
  var_pop?: Maybe<User_Typing_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Typing_Var_Samp_Order_By>;
  variance?: Maybe<User_Typing_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_typing" */
export type User_Typing_Arr_Rel_Insert_Input = {
  data: Array<User_Typing_Insert_Input>;
};

/** aggregate avg on columns */
export type User_Typing_Avg_Fields = {
  __typename?: 'user_typing_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_typing" */
export type User_Typing_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_typing". All fields are combined with a logical 'AND'. */
export type User_Typing_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Typing_Bool_Exp>>>;
  _not?: Maybe<User_Typing_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Typing_Bool_Exp>>>;
  id?: Maybe<Int_Comparison_Exp>;
  last_seen?: Maybe<Timestamptz_Comparison_Exp>;
  last_typed?: Maybe<Timestamptz_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** input type for incrementing integer column in table "user_typing" */
export type User_Typing_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_typing" */
export type User_Typing_Insert_Input = {
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Typing_Max_Fields = {
  __typename?: 'user_typing_max_fields';
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_typing" */
export type User_Typing_Max_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  last_typed?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Typing_Min_Fields = {
  __typename?: 'user_typing_min_fields';
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_typing" */
export type User_Typing_Min_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  last_typed?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_typing" */
export type User_Typing_Mutation_Response = {
  __typename?: 'user_typing_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Typing>;
};

/** input type for inserting object relation for remote table "user_typing" */
export type User_Typing_Obj_Rel_Insert_Input = {
  data: User_Typing_Insert_Input;
};

/** ordering options when selecting data from "user_typing" */
export type User_Typing_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  last_typed?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** select columns of table "user_typing" */
export enum User_Typing_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  LastTyped = 'last_typed',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "user_typing" */
export type User_Typing_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  last_typed?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Typing_Stddev_Fields = {
  __typename?: 'user_typing_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_typing" */
export type User_Typing_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Typing_Stddev_Pop_Fields = {
  __typename?: 'user_typing_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_typing" */
export type User_Typing_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Typing_Stddev_Samp_Fields = {
  __typename?: 'user_typing_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_typing" */
export type User_Typing_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Typing_Sum_Fields = {
  __typename?: 'user_typing_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_typing" */
export type User_Typing_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type User_Typing_Var_Pop_Fields = {
  __typename?: 'user_typing_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_typing" */
export type User_Typing_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Typing_Var_Samp_Fields = {
  __typename?: 'user_typing_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_typing" */
export type User_Typing_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Typing_Variance_Fields = {
  __typename?: 'user_typing_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_typing" */
export type User_Typing_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  Auth0UserId = 'auth0_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  LastTyped = 'last_typed',
  /** column name */
  Username = 'username'
}

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user" */
export type User_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user" */
export type User_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user" */
export type User_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

export type InsertMessageMutationVariables = Exact<{
  message: Message_Insert_Input;
}>;


export type InsertMessageMutation = (
  { __typename?: 'mutation_root' }
  & { insert_message?: Maybe<(
    { __typename?: 'message_mutation_response' }
    & { returning: Array<(
      { __typename?: 'message' }
      & Pick<Message, 'id' | 'timestamp' | 'text'>
      & { user: (
        { __typename?: 'user' }
        & Pick<User, 'username'>
      ), channel: (
        { __typename?: 'channel' }
        & Pick<Channel, 'name'>
      ) }
    )> }
  )> }
);

export type SetUserOnlineMutationVariables = Exact<{
  user_id?: Maybe<Scalars['String']>;
}>;


export type SetUserOnlineMutation = (
  { __typename?: 'mutation_root' }
  & { update_user?: Maybe<(
    { __typename?: 'user_mutation_response' }
    & Pick<User_Mutation_Response, 'affected_rows'>
  )> }
);

export type AddChannelMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  is_private?: Maybe<Scalars['Boolean']>;
}>;


export type AddChannelMutation = (
  { __typename?: 'mutation_root' }
  & { insert_channel?: Maybe<(
    { __typename?: 'channel_mutation_response' }
    & { returning: Array<(
      { __typename?: 'channel' }
      & Pick<Channel, 'id' | 'name' | 'owner_id' | 'is_private'>
    )> }
  )> }
);

export type GetMessagesQueryVariables = Exact<{
  last_received_id?: Maybe<Scalars['Int']>;
  last_received_ts?: Maybe<Scalars['timestamptz']>;
  channel?: Maybe<Scalars['String']>;
}>;


export type GetMessagesQuery = (
  { __typename?: 'query_root' }
  & { channel: Array<(
    { __typename?: 'channel' }
    & { messages: Array<(
      { __typename?: 'message' }
      & Pick<Message, 'id' | 'text' | 'timestamp'>
      & { user: (
        { __typename?: 'user' }
        & Pick<User, 'username'>
      ), channel: (
        { __typename?: 'channel' }
        & Pick<Channel, 'name'>
      ), channel_threads: Array<(
        { __typename?: 'channel_thread' }
        & Pick<Channel_Thread, 'id'>
      )> }
    )> }
  )> }
);

export type GetChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelsQuery = (
  { __typename?: 'query_root' }
  & { channels: Array<(
    { __typename?: 'channel' }
    & Pick<Channel, 'name' | 'id' | 'is_private' | 'owner_id'>
  )> }
);

export type GetChannelByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetChannelByNameQuery = (
  { __typename?: 'query_root' }
  & { channel: Array<(
    { __typename?: 'channel' }
    & Pick<Channel, 'name' | 'id' | 'is_private' | 'owner_id'>
  )> }
);

export type GetAuth0UserByIdQueryVariables = Exact<{
  user_id?: Maybe<Scalars['String']>;
}>;


export type GetAuth0UserByIdQuery = (
  { __typename?: 'query_root' }
  & { user: Array<(
    { __typename?: 'user' }
    & Pick<User, 'id' | 'username' | 'auth0_user_id'>
    & { user_channels: Array<(
      { __typename?: 'user_channels' }
      & { channel: (
        { __typename?: 'channel' }
        & Pick<Channel, 'name' | 'id' | 'is_private'>
      ) }
    )> }
  )> }
);

export type WatchNewMessagesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type WatchNewMessagesSubscription = (
  { __typename?: 'subscription_root' }
  & { newMessages: Array<(
    { __typename?: 'message' }
    & Pick<Message, 'id' | 'text' | 'timestamp'>
    & { user: (
      { __typename?: 'user' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type WatchMessagesSubscriptionVariables = Exact<{
  channelId: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
}>;


export type WatchMessagesSubscription = (
  { __typename?: 'subscription_root' }
  & { messages: Array<(
    { __typename?: 'message' }
    & Pick<Message, 'id' | 'text' | 'timestamp'>
    & { user: (
      { __typename?: 'user' }
      & Pick<User, 'username'>
    ), channel: (
      { __typename?: 'channel' }
      & Pick<Channel, 'name'>
    ), channel_threads: Array<(
      { __typename?: 'channel_thread' }
      & Pick<Channel_Thread, 'id'>
    )> }
  )> }
);

export type WatchOnlineUsersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type WatchOnlineUsersSubscription = (
  { __typename?: 'subscription_root' }
  & { users: Array<(
    { __typename?: 'user_online' }
    & Pick<User_Online, 'id' | 'username'>
  )> }
);

export type WatchChannelsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type WatchChannelsSubscription = (
  { __typename?: 'subscription_root' }
  & { channels: Array<(
    { __typename?: 'channel' }
    & Pick<Channel, 'name' | 'id' | 'is_private' | 'owner_id'>
  )> }
);


export const InsertMessageDocument = gql`
    mutation insertMessage($message: message_insert_input!) {
  insert_message(objects: [$message]) {
    returning {
      id
      timestamp
      text
      user {
        username
      }
      channel {
        name
      }
    }
  }
}
    `;
export type InsertMessageMutationFn = Apollo.MutationFunction<InsertMessageMutation, InsertMessageMutationVariables>;

/**
 * __useInsertMessageMutation__
 *
 * To run a mutation, you first call `useInsertMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertMessageMutation, { data, loading, error }] = useInsertMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useInsertMessageMutation(baseOptions?: Apollo.MutationHookOptions<InsertMessageMutation, InsertMessageMutationVariables>) {
        return Apollo.useMutation<InsertMessageMutation, InsertMessageMutationVariables>(InsertMessageDocument, baseOptions);
      }
export type InsertMessageMutationHookResult = ReturnType<typeof useInsertMessageMutation>;
export type InsertMessageMutationResult = Apollo.MutationResult<InsertMessageMutation>;
export type InsertMessageMutationOptions = Apollo.BaseMutationOptions<InsertMessageMutation, InsertMessageMutationVariables>;
export const SetUserOnlineDocument = gql`
    mutation setUserOnline($user_id: String) {
  update_user(_set: {last_seen: "now()"}, where: {auth0_user_id: {_eq: $user_id}}) {
    affected_rows
  }
}
    `;
export type SetUserOnlineMutationFn = Apollo.MutationFunction<SetUserOnlineMutation, SetUserOnlineMutationVariables>;

/**
 * __useSetUserOnlineMutation__
 *
 * To run a mutation, you first call `useSetUserOnlineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserOnlineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserOnlineMutation, { data, loading, error }] = useSetUserOnlineMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useSetUserOnlineMutation(baseOptions?: Apollo.MutationHookOptions<SetUserOnlineMutation, SetUserOnlineMutationVariables>) {
        return Apollo.useMutation<SetUserOnlineMutation, SetUserOnlineMutationVariables>(SetUserOnlineDocument, baseOptions);
      }
export type SetUserOnlineMutationHookResult = ReturnType<typeof useSetUserOnlineMutation>;
export type SetUserOnlineMutationResult = Apollo.MutationResult<SetUserOnlineMutation>;
export type SetUserOnlineMutationOptions = Apollo.BaseMutationOptions<SetUserOnlineMutation, SetUserOnlineMutationVariables>;
export const AddChannelDocument = gql`
    mutation addChannel($name: String, $owner_id: String, $is_private: Boolean) {
  insert_channel(objects: {name: $name, owner_id: $owner_id, is_private: $is_private}) {
    returning {
      id
      name
      owner_id
      is_private
    }
  }
}
    `;
export type AddChannelMutationFn = Apollo.MutationFunction<AddChannelMutation, AddChannelMutationVariables>;

/**
 * __useAddChannelMutation__
 *
 * To run a mutation, you first call `useAddChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChannelMutation, { data, loading, error }] = useAddChannelMutation({
 *   variables: {
 *      name: // value for 'name'
 *      owner_id: // value for 'owner_id'
 *      is_private: // value for 'is_private'
 *   },
 * });
 */
export function useAddChannelMutation(baseOptions?: Apollo.MutationHookOptions<AddChannelMutation, AddChannelMutationVariables>) {
        return Apollo.useMutation<AddChannelMutation, AddChannelMutationVariables>(AddChannelDocument, baseOptions);
      }
export type AddChannelMutationHookResult = ReturnType<typeof useAddChannelMutation>;
export type AddChannelMutationResult = Apollo.MutationResult<AddChannelMutation>;
export type AddChannelMutationOptions = Apollo.BaseMutationOptions<AddChannelMutation, AddChannelMutationVariables>;
export const GetMessagesDocument = gql`
    query getMessages($last_received_id: Int, $last_received_ts: timestamptz, $channel: String) {
  channel(where: {name: {_eq: $channel}}) {
    messages(order_by: {timestamp: asc}, where: {_and: {id: {_neq: $last_received_id}, timestamp: {_gte: $last_received_ts}}}) {
      id
      text
      timestamp
      user {
        username
      }
      channel {
        name
      }
      channel_threads {
        id
      }
    }
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      last_received_id: // value for 'last_received_id'
 *      last_received_ts: // value for 'last_received_ts'
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetChannelsDocument = gql`
    query getChannels {
  channels: channel {
    name
    id
    is_private
    owner_id
  }
}
    `;

/**
 * __useGetChannelsQuery__
 *
 * To run a query within a React component, call `useGetChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
        return Apollo.useQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, baseOptions);
      }
export function useGetChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
          return Apollo.useLazyQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, baseOptions);
        }
export type GetChannelsQueryHookResult = ReturnType<typeof useGetChannelsQuery>;
export type GetChannelsLazyQueryHookResult = ReturnType<typeof useGetChannelsLazyQuery>;
export type GetChannelsQueryResult = Apollo.QueryResult<GetChannelsQuery, GetChannelsQueryVariables>;
export const GetChannelByNameDocument = gql`
    query getChannelByName($name: String!) {
  channel(where: {name: {_eq: $name}}) {
    name
    id
    is_private
    owner_id
  }
}
    `;

/**
 * __useGetChannelByNameQuery__
 *
 * To run a query within a React component, call `useGetChannelByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetChannelByNameQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelByNameQuery, GetChannelByNameQueryVariables>) {
        return Apollo.useQuery<GetChannelByNameQuery, GetChannelByNameQueryVariables>(GetChannelByNameDocument, baseOptions);
      }
export function useGetChannelByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelByNameQuery, GetChannelByNameQueryVariables>) {
          return Apollo.useLazyQuery<GetChannelByNameQuery, GetChannelByNameQueryVariables>(GetChannelByNameDocument, baseOptions);
        }
export type GetChannelByNameQueryHookResult = ReturnType<typeof useGetChannelByNameQuery>;
export type GetChannelByNameLazyQueryHookResult = ReturnType<typeof useGetChannelByNameLazyQuery>;
export type GetChannelByNameQueryResult = Apollo.QueryResult<GetChannelByNameQuery, GetChannelByNameQueryVariables>;
export const GetAuth0UserByIdDocument = gql`
    query getAuth0UserById($user_id: String) {
  user(where: {auth0_user_id: {_eq: $user_id}}) {
    id
    username
    auth0_user_id
    user_channels {
      channel {
        name
        id
        is_private
      }
    }
  }
}
    `;

/**
 * __useGetAuth0UserByIdQuery__
 *
 * To run a query within a React component, call `useGetAuth0UserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuth0UserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuth0UserByIdQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetAuth0UserByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetAuth0UserByIdQuery, GetAuth0UserByIdQueryVariables>) {
        return Apollo.useQuery<GetAuth0UserByIdQuery, GetAuth0UserByIdQueryVariables>(GetAuth0UserByIdDocument, baseOptions);
      }
export function useGetAuth0UserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuth0UserByIdQuery, GetAuth0UserByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetAuth0UserByIdQuery, GetAuth0UserByIdQueryVariables>(GetAuth0UserByIdDocument, baseOptions);
        }
export type GetAuth0UserByIdQueryHookResult = ReturnType<typeof useGetAuth0UserByIdQuery>;
export type GetAuth0UserByIdLazyQueryHookResult = ReturnType<typeof useGetAuth0UserByIdLazyQuery>;
export type GetAuth0UserByIdQueryResult = Apollo.QueryResult<GetAuth0UserByIdQuery, GetAuth0UserByIdQueryVariables>;
export const WatchNewMessagesDocument = gql`
    subscription watchNewMessages {
  newMessages: message(order_by: {id: desc}, limit: 1) {
    id
    text
    timestamp
    user {
      username
    }
  }
}
    `;

/**
 * __useWatchNewMessagesSubscription__
 *
 * To run a query within a React component, call `useWatchNewMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchNewMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchNewMessagesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useWatchNewMessagesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<WatchNewMessagesSubscription, WatchNewMessagesSubscriptionVariables>) {
        return Apollo.useSubscription<WatchNewMessagesSubscription, WatchNewMessagesSubscriptionVariables>(WatchNewMessagesDocument, baseOptions);
      }
export type WatchNewMessagesSubscriptionHookResult = ReturnType<typeof useWatchNewMessagesSubscription>;
export type WatchNewMessagesSubscriptionResult = Apollo.SubscriptionResult<WatchNewMessagesSubscription>;
export const WatchMessagesDocument = gql`
    subscription watchMessages($channelId: Int!, $limit: Int = 20) {
  messages: message(order_by: {timestamp: desc}, limit: $limit, where: {channel: {id: {_eq: $channelId}}}) {
    id
    text
    timestamp
    user {
      username
    }
    channel {
      name
    }
    channel_threads {
      id
    }
  }
}
    `;

/**
 * __useWatchMessagesSubscription__
 *
 * To run a query within a React component, call `useWatchMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchMessagesSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useWatchMessagesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<WatchMessagesSubscription, WatchMessagesSubscriptionVariables>) {
        return Apollo.useSubscription<WatchMessagesSubscription, WatchMessagesSubscriptionVariables>(WatchMessagesDocument, baseOptions);
      }
export type WatchMessagesSubscriptionHookResult = ReturnType<typeof useWatchMessagesSubscription>;
export type WatchMessagesSubscriptionResult = Apollo.SubscriptionResult<WatchMessagesSubscription>;
export const WatchOnlineUsersDocument = gql`
    subscription watchOnlineUsers {
  users: user_online(order_by: {username: asc}) {
    id
    username
  }
}
    `;

/**
 * __useWatchOnlineUsersSubscription__
 *
 * To run a query within a React component, call `useWatchOnlineUsersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchOnlineUsersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchOnlineUsersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useWatchOnlineUsersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<WatchOnlineUsersSubscription, WatchOnlineUsersSubscriptionVariables>) {
        return Apollo.useSubscription<WatchOnlineUsersSubscription, WatchOnlineUsersSubscriptionVariables>(WatchOnlineUsersDocument, baseOptions);
      }
export type WatchOnlineUsersSubscriptionHookResult = ReturnType<typeof useWatchOnlineUsersSubscription>;
export type WatchOnlineUsersSubscriptionResult = Apollo.SubscriptionResult<WatchOnlineUsersSubscription>;
export const WatchChannelsDocument = gql`
    subscription watchChannels {
  channels: channel {
    name
    id
    is_private
    owner_id
  }
}
    `;

/**
 * __useWatchChannelsSubscription__
 *
 * To run a query within a React component, call `useWatchChannelsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchChannelsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchChannelsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useWatchChannelsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<WatchChannelsSubscription, WatchChannelsSubscriptionVariables>) {
        return Apollo.useSubscription<WatchChannelsSubscription, WatchChannelsSubscriptionVariables>(WatchChannelsDocument, baseOptions);
      }
export type WatchChannelsSubscriptionHookResult = ReturnType<typeof useWatchChannelsSubscription>;
export type WatchChannelsSubscriptionResult = Apollo.SubscriptionResult<WatchChannelsSubscription>;