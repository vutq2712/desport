import { useState, useRef } from "react";
import { searchUser, SearchUserData } from "@app/api/tournament/search-user";
import { addOperator } from "@app/api/tournament/add-operator";
import { useRouter } from "next/router";
import { addSupporter } from "@app/api/tournament/add-supporter";
import { useSubscription } from "@app/hooks/subscription";
import { Col, Row } from "react-bootstrap";

export function AuthorizationSetting() {
  const [authorType, changeAuthorType] = useState<string>("");
  const [listAuthor, changeListAuthor] = useState<any>([]);
  const [listSearchAuthor, changeListSearchAuthor] = useState<SearchUserData[]>(
    []
  );
  const router = useRouter();
  const subscription = useSubscription();
  const debounce = useRef<any>(null);

  const onSearch = (e) => {
    if (!e.target) return;

    const action = () => {
      const sub = searchUser({
        name: e.target.value,
        page: 1,
        limit: 1000, // TODO refactor later
      }).subscribe((res) => {
        changeListSearchAuthor(res.data);
      });

      subscription.add(sub);
    };

    if (debounce.current) clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      action();
    }, 300);
  };

  const onChangeAuthorType = (e) => {
    if (!e.target) return;

    changeAuthorType(e.target.value);
  };

  const onAdd = (userId, username) => {
    if (authorType.endsWith("O")) {
      if (
        listAuthor.findIndex(
          (item) => item.type === "O" && item.username === username
        ) > -1
      ) {
        alert("Username exist");
        return;
      }

      const sub = addOperator({
        _id: router.query.tournamentId as string,
        operator: userId,
      }).subscribe((res) => {
        changeListAuthor([
          ...listAuthor,
          {
            username,
            type: "O",
          },
        ]);
        alert("Success");
      });

      subscription.add(sub);

      return;
    }

    if (
      listAuthor.findIndex(
        (item) => item.type === "S" && item.username === username
      ) > -1
    ) {
      alert("Username exist");
      return;
    }

    const sub = addSupporter({
      _id: router.query.tournamentId as string,
      supporter: userId,
    }).subscribe((res) => {
      changeListAuthor([
        ...listAuthor,
        {
          username,
          type: "S",
        },
      ]);
      alert("Success");
    });

    subscription.add(sub);
  };

  const onDeleteAuthor = (user) => {
    alert("TODO delete: " + user.username);
  };

  return (
    <>
      <div className='de-card-header'>
        <div className='de-card-title'>Authorization Setting</div>
      </div>
      <div className='de-card-body'>
        <Row>
          <Col sm='3' md='3' lg='3'>
            <input
              className='de-form-control form-control'
              onChange={onSearch}
              placeholder='Search'
            />
          </Col>
        </Row>

        {listSearchAuthor && listSearchAuthor.length ?
          <div className='list-search de-mt-2'>
            <Row>
              {listSearchAuthor.map((user) => (
                <Col md='6' key={user._id}>
                  <div className='de-team-member-card online w-100 border-0'>
                    <div className='member-avatar'>
                      <img src='/assets/images/avatar-2.png' alt={user?.username} />
                    </div>
                    <div className='member-info'>
                      <div className='member-name de-mb-2'>
                        <span>{user.username}</span>
                        <div className='member-status online'></div>
                      </div>
                      <div className='d-flex de-mb-3'>
                        <div className='de-form-check form-check mb-0 de-me-3'>
                          <input type='radio' name='rd_role' id={`rd_${user._id}_role_Operator`} className='de-form-check-input form-check-input mt-0' onChange={onChangeAuthorType} value={`${user._id}O`} checked={authorType === `${user._id}O`} />
                          <label className='de-form-check-label form-check-label' htmlFor={`rd_${user._id}_role_Operator`}>Operator</label>
                        </div>
                        <div className='de-form-check form-check mb-0'>
                          <input type='radio' name='rd_role' id={`rd_${user._id}_role_Supporter`} className='de-form-check-input form-check-input mt-0' onChange={onChangeAuthorType} value={`${user._id}S`} checked={authorType === `${user._id}S`} />
                          <label className='de-form-check-label form-check-label' htmlFor={`rd_${user._id}_role_Supporter`}>
                            Supporter
                          </label>
                        </div>
                      </div>
                      <div className='actions'>
                        <button className='de-btn de-btn-outline-secondary de-btn-sm de-me-1' type='button' onClick={() => onAdd(user._id, user.username)}>
                          Cancel
                        </button>
                        <button className='de-btn de-btn-secondary de-btn-sm' type='button'
                          disabled={
                            authorType !== `${user._id}O` &&
                            authorType !== `${user._id}S`
                          }
                          onClick={() => onAdd(user._id, user.username)}>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div> :
          <></>
        }

        {listAuthor && listAuthor.length ?
          <div className='list-author-setting de-mt-2'>
            <Row>
              {listAuthor.map((user, idx) => (
                <Col sm='3' md='3' lg='3' key={idx}>
                  <div className='de-team-member-card online w-100'>
                    <div className='member-avatar'>
                      <img
                        src='/assets/images/avatar-2.png'
                        alt={user?.username}
                      />
                    </div>
                    <div className='member-info'>
                      <div className='member-name'>
                        <span>{user.username}</span>
                        <div className='member-status online'></div>
                      </div>
                      <div className='member-description'>
                        Operator
                      </div>
                      <button
                        onClick={() => onDeleteAuthor(user)}
                        type='button'
                        className='member-kick danger'
                      >
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div> :
          <></>
        }
      </div>
    </>
  );
}
